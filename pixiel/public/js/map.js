document.addEventListener("DOMContentLoaded", async () => {
    const map = L.map("gtaMap", {
      zoomControl: false,
      scrollWheelZoom: true
    }).setView([51.768, 55.1], 15);
  
    L.tileLayer(
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        {
          attribution: '&copy; OpenStreetMap contributors',
          maxZoom: 19
        }
      ).addTo(map);
  
    L.control.zoom({
      position: "bottomright"
    }).addTo(map);
  
    const address = "Чкалова 11, Оренбург, Россия";
  
    try {
      const params = new URLSearchParams({
        q: address,
        format: "jsonv2",
        limit: "1",
        countrycodes: "ru"
      });
  
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?${params}`
      );
  
      if (!response.ok) {
        throw new Error("Geocoding error");
      }
  
      const places = await response.json();
  
      if (!places.length) {
        throw new Error("Address not found");
      }
  
      const coords = [
        Number(places[0].lat),
        Number(places[0].lon)
      ];
  
      const icon = L.divIcon({
        className: "",
        html: '<div class="business-marker">▲</div>',
        iconSize: [38, 38],
        iconAnchor: [19, 19]
      });
  
      L.marker(coords, { icon })
        .addTo(map)
        .bindPopup("<b>BUSINESS LOCATION</b><br>Чкалова, 11");
  
      map.setView(coords, 16);
    } catch (error) {
      console.error("Map error:", error);
    }
  
    setTimeout(() => map.invalidateSize(), 200);
  });