
DST_PATH = ../../images/clocks

PSD = gold.psd black.psd
PNG = $(addsuffix .png, $(basename $(PSD)))
ECHO = @echo
RM = @rm

PSD_FILES = $(shell find . -type f -path '*.psd')
PNG_FILES = $(patsubst %.psd,%.png, $(PSD_FILES))

FILES     = $(addprefix $(DST_PATH)/, $(PNG_FILES))

all: $(FILES)
	$(ECHO) Done.

$(DST_PATH)/%.png: %.psd
	python generate-clock.py -f $< -o $@

clean:
	$(RM) -f $(FILES)

