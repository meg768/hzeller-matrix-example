import sys, getopt, logging, os


from PIL import Image
from psd_tools import PSDImage




def generateRotatedImages(image):

	out = Image.new("RGBA", (image.width * 60, image.height)) 
	
	for index in range(0, 60):
		tmpimage = image.rotate(-360.0 * (index / 60.0), Image.BICUBIC)
		out.paste(tmpimage, [index * image.width, 0, (index + 1) * image.width, image.height])

	return out
	


def getLayerImage(psd, name):
	image = Image.new("RGBA", (psd.header.width, psd.header.height)) 
	
	for layer in psd.layers:
		if layer.name == name:
			layerImage = layer.as_PIL()
			image.paste(layerImage, [layer.bbox.x1, layer.bbox.y1, layer.bbox.x1 + layerImage.width, layer.bbox.y1 + layerImage.height], layerImage)
			return image

	return image
	


def pasteImage(image, frame, index):
	image.paste(frame, [index * frame.width, 0, (index + 1) * frame.width, frame.height], frame)
	

def rotateImage(image, index):
	return image.rotate(-360.0 * (index / 60.0), Image.BICUBIC)

def resizeImage(image, size):
	return image.resize((size, size), Image.BICUBIC)
	

def buildClockImage(psd, size):
	
	clockImage = Image.new("RGBA", (size * 182, size)) 
	
	backgroundImage = getLayerImage(psd, "background")
	foregroundImage = getLayerImage(psd, "foreground")
	hoursImage = getLayerImage(psd, "hours")
	minutesImage = getLayerImage(psd, "minutes")
	secondsImage = getLayerImage(psd, "seconds")

	pasteImage(clockImage, resizeImage(backgroundImage, size), 0)
	pasteImage(clockImage, resizeImage(foregroundImage, size), 60 + 60 + 60 + 1)
	
	for index in range(0, 60):
		image = hoursImage
		image = rotateImage(image, index)
		image = resizeImage(image, size)
		pasteImage(clockImage, image, index + 1)

	for index in range(0, 60):
		image = minutesImage
		image = rotateImage(image, index)
		image = resizeImage(image, size)
		pasteImage(clockImage, image, index + 60 + 1)

	for index in range(0, 60):
		image = secondsImage
		image = rotateImage(image, index)
		image = resizeImage(image, size)
		pasteImage(clockImage, image, index + 60 + 60 + 1)

		
	return clockImage
		
		
		
def main(argv):
	
	logger = logging.getLogger(__name__)	

	fileName = ""
	outputFileName = ""
	size = 96
		
	try:
		opts, args = getopt.getopt(argv,"f:o:s:")

	except getopt.GetoptError:
		print("Invalid parameters.")
		sys.exit(1)
	
	for opt, arg in opts:
		if opt == '-f':
			fileName = unicode(arg, "UTF-8")
		elif opt == '-o':
			outputFileName = arg
		elif opt == '-s':
			size = int(arg)

	if fileName == "":
		print("Need a Photoshop file to convert.")
		sys.exit(1)

	if outputFileName == "":
		name, extension = os.path.splitext(fileName)
		outputFileName = name + ".png"
		
	psd = PSDImage.load(fileName)
	image = buildClockImage(psd, size)	
	image.save(outputFileName)



main(sys.argv[1:])
