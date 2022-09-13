# ----------------------------------------------------------------------------
# Copyright (c) 2022 by Burkhardt Renz. No rights reserved.
# ----------------------------------------------------------------------------

default:
	@echo "To publish: make publ"

publ:
	@echo "Don't forget to build the app first!!"
	rsync -av dist/ /Users/br/WebSite-published/esb-music.github.io
	@echo "==> Publizieren durch check-in in esb-music"

