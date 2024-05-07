AFRAME.registerComponent("cursor-listener", {
    schema: {
      selectedItemId: { default: "", type: "string" },
    },
    init: function () {
      this.handleMouseClickEvents();
      this.handleClickEvents();
      this.handleMouseEnterEvents();
      this.handleMouseLeaveEvents();
      
    },

    handleMouseClickEvents: function () {
        if (selectedItemId) {
            fadeBackgroundEl.setAttribute("visible",true);
            fadeBackgroundEl.setAttribute("info-banner", {
                itemId:selectedItemId,
            });
            titleEl.setAttribute("visible", false);
            cursorEl.setAttribute("position", { x: 0, y:0, z:-1});
            cursorEl.setAttribute("geometry", {
                radiusInner: 0.03,
                radiusOuter: 0.04,
            });
        } else{
            fadeBackgroundEl.setAttribute("visible",false);
            titleEl.setAttribute("visible", true);
            cursorEl.setAttribute("position", { x:0, y:0, z:-3});
            cursorEl.setAttribute("geometry", {
                radiusInner: 0.08,
                radiusOuter: 0.12,
            

            update: function () {
                const fadeBackgroundEl = document.querySelector("#fadeBackground");

                c = fadeBackgroundEl.children;
                if (c.length > 0) {
                    var i;
                    for (i = 0; i <= c.length; i++) {
                        fadeBackgroundEl.removeChild(c[i]);
                  }
                } else {
                    this.handleMouseClickEvents();
                }
            }
              }
            )}
    },
    handleClickEvents: function () {
        //Cursor 'click' Events
        this.el.addEventListener("click", evt => {
          const placesContainer = document.querySelector("#places-container");
          const { state } = placesContainer.getAttribute("poster");
    
          if (state === "places-list") {
            const id = this.el.getAttribute("id");
            const placesId = [
              "superman",
              "spiderman",
              "captain-aero",
              "outer-space"
            ];
            if (placesId.includes(id)) {
              placesContainer.setAttribute("poster", {
                state: "view",
                selectedCard: id
              });
            }
          }
        });
      },
      
  
    handlePlacesListState: function () {
      const id = this.el.getAttribute("id");
      const placesId = ["superman", "spiderman", "captain-aero", "outer-space"];
      if (placesId.includes(id)) {
        const placeContainer = document.querySelector("#places-container");
        placeContainer.setAttribute("cursor-listener", {
          selectedItemId: id,
        });
        this.el.setAttribute("material", {
          color: "#D76B30",
          opacity: 1,
        });
      }
    },
    handleMouseEnterEvents: function () {
      // Mouse Enter Events
      this.el.addEventListener("mouseenter", () => {
        const placeContainer = document.querySelector("#places-container");
        const { state } = placeContainer.getAttribute("poster");
        if (state === "places-list") {
        this.handlePlacesListState();
        }
      });
    },
    handleMouseLeaveEvents: function () {
      // Mouse Leave Events
      this.el.addEventListener("mouseleave", () => {
        const { selectedItemId } = this.data;
        if(selectedItemId) {
          const el=document.querySelector(`#${selectedItemId}`);
          const id = el.getAttribute("id");
          if(id == selectedItemId) {
            el.setAttribute("material", {
              color: "#0077CC",
              opacity: 1,
            });
          }
        }
      });
    },
  });
  