// ブートストラップ ローダ
(g=>{var h,a,k,p="The Google Maps JavaScript API",c="google",l="importLibrary",q="__ib__",m=document,b=window;b=b[c]||(b[c]={});var d=b.maps||(b.maps={}),r=new Set,e=new URLSearchParams,u=()=>h||(h=new Promise(async(f,n)=>{await (a=m.createElement("script"));e.set("libraries",[...r]+"");for(k in g)e.set(k.replace(/[A-Z]/g,t=>"_"+t[0].toLowerCase()),g[k]);e.set("callback",c+".maps."+q);a.src=`https://maps.${c}apis.com/maps/api/js?`+e;d[q]=f;a.onerror=()=>h=n(Error(p+" could not load."));a.nonce=m.querySelector("script[nonce]")?.nonce||"";m.head.append(a)}));d[l]?console.warn(p+" only loads once. Ignoring:",g):d[l]=(f,...n)=>r.add(f)&&u().then(()=>d[l](f,...n))})({
  key: process.env.Maps_API_Key
});


// ライブラリの読み込み
let map;

async function initMap() {
  const { Map } = await google.maps.importLibrary("maps");
  const {AdvancedMarkerElement} = await google.maps.importLibrary("marker")
  
  //。デフォルトを大阪城に　数値が小さいほうがロング 一回のクリック分
  // クラウドカスタマイズ機能を使用する
  map = new Map(document.getElementById("map"), {
    center: { lat: 34.687295, lng: 135.525809 },
    zoom: 14,
    mapId: "12e54403ce86cc3",
    mapTypeControl: false,

  });
  
  try {
    const response = await fetch("/post_images.json");
    if (!response.ok) throw new Error('Network response was not ok');

    const { data: { items } } = await response.json();
    if (!Array.isArray(items)) throw new Error("Items is not an array");

    items.forEach( item => {
      const latitude = item.latitude;
      const longitude = item.longitude;
      const shopName = item.shop_name;

      const userImage = item.user.image;
      const userName = item.user.name;
      const postImage = item.image;
      const address = item.address;
      const caption = item.caption;

      const marker = new google.maps.marker.AdvancedMarkerElement ({
        position: { lat: latitude, lng: longitude },
        map,
        title: shopName,
        // 他の任意のオプションもここに追加可能
      });
      
      const beachFlagImg = document.createElement("img");
      beachFlagImg.src =
        "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png";
        
      const beachFlagMarkerView = new AdvancedMarkerElement({
        map,
        position: { lat: 34.687295, lng: 135.525809 },
        content: beachFlagImg,
        title: "Osaka Catsle",
      });
      
      const contentString = `
        <div class="information container p-0">
          <div class="mb-3">
            <img class="thumbnail" src="${postImage}" width="220" loading="lazy">
          </div>
          <div>
            <h1 class="h5 font-weight-bold">${shopName}</h1>
            <p class="text-muted">${address}</p>
          </div>
          <div class="mb-3 d-flex align-items-center">
            <img class="rounded-circle mr-2" src="${userImage}" width="40" height="40">
            <p class="lead m-0 font-weight-bold">${userName}</p>
          </div>
          <div>
            <p>${caption}</p>
          </div>
        </div>
      `;

      const infowindow = new google.maps.InfoWindow({
        content: contentString,
        maxWidth: 250,
        ariaLabel: shopName,
        // マウスオーバーの表示
      });

      marker.addListener("click", () => {
        infowindow.open({
        anchor: marker,
        map,
        })
      });
      
      google.maps.event.addListener(map,"click", () => {
        infowindow.close();
      });

    });
  } catch (error) {
    console.error('Error fetching or processing post images:', error);
  }
}
initMap()


  // const selector = document.getElementById("selector");

  // selector.addEventListener("change", () => {
  //   map.setOptions({ styles: styles[selector.value] });
  // });
  
  // const styles = {
  //   default: [],
  //   silver: [
  //     {
  //       elementType: "geometry",
  //       stylers: [{ color: "#f5f5f5" }],
  //     },
  //     {
  //       elementType: "labels.icon",
  //       stylers: [{ visibility: "off" }],
  //     },
  //     {
  //       elementType: "labels.text.fill",
  //       stylers: [{ color: "#616161" }],
  //     },
  //     {
  //       elementType: "labels.text.stroke",
  //       stylers: [{ color: "#f5f5f5" }],
  //     },
  //     {
  //       featureType: "administrative.land_parcel",
  //       elementType: "labels.text.fill",
  //       stylers: [{ color: "#bdbdbd" }],
  //     },
  //     {
  //       featureType: "poi",
  //       elementType: "geometry",
  //       stylers: [{ color: "#eeeeee" }],
  //     },
  //     {
  //       featureType: "poi",
  //       elementType: "labels.text.fill",
  //       stylers: [{ color: "#757575" }],
  //     },
  //     {
  //       featureType: "poi.park",
  //       elementType: "geometry",
  //       stylers: [{ color: "#e5e5e5" }],
  //     },
  //     {
  //       featureType: "poi.park",
  //       elementType: "labels.text.fill",
  //       stylers: [{ color: "#9e9e9e" }],
  //     },
  //     {
  //       featureType: "road",
  //       elementType: "geometry",
  //       stylers: [{ color: "#ffffff" }],
  //     },
  //     {
  //       featureType: "road.arterial",
  //       elementType: "labels.text.fill",
  //       stylers: [{ color: "#757575" }],
  //     },
  //     {
  //       featureType: "road.highway",
  //       elementType: "geometry",
  //       stylers: [{ color: "#dadada" }],
  //     },
  //     {
  //       featureType: "road.highway",
  //       elementType: "labels.text.fill",
  //       stylers: [{ color: "#616161" }],
  //     },
  //     {
  //       featureType: "road.local",
  //       elementType: "labels.text.fill",
  //       stylers: [{ color: "#9e9e9e" }],
  //     },
  //     {
  //       featureType: "transit.line",
  //       elementType: "geometry",
  //       stylers: [{ color: "#e5e5e5" }],
  //     },
  //     {
  //       featureType: "transit.station",
  //       elementType: "geometry",
  //       stylers: [{ color: "#eeeeee" }],
  //     },
  //     {
  //       featureType: "water",
  //       elementType: "geometry",
  //       stylers: [{ color: "#c9c9c9" }],
  //     },
  //     {
  //       featureType: "water",
  //       elementType: "labels.text.fill",
  //       stylers: [{ color: "#9e9e9e" }],
  //     },
  //   ],
  //   night: [
  //     { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
  //     {
  //       elementType: "labels.text.stroke",
  //       stylers: [{ color: "#242f3e" }],
  //     },
  //     { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
  //     {
  //       featureType: "administrative.locality",
  //       elementType: "labels.text.fill",
  //       stylers: [{ color: "#d59563" }],
  //     },
  //     {
  //       featureType: "poi",
  //       elementType: "labels.text.fill",
  //       stylers: [{ color: "#d59563" }],
  //     },
  //     {
  //       featureType: "poi.park",
  //       elementType: "geometry",
  //       stylers: [{ color: "#263c3f" }],
  //     },
  //     {
  //       featureType: "poi.park",
  //       elementType: "labels.text.fill",
  //       stylers: [{ color: "#6b9a76" }],
  //     },
  //     {
  //       featureType: "road",
  //       elementType: "geometry",
  //       stylers: [{ color: "#38414e" }],
  //     },
  //     {
  //       featureType: "road",
  //       elementType: "geometry.stroke",
  //       stylers: [{ color: "#212a37" }],
  //     },
  //     {
  //       featureType: "road",
  //       elementType: "labels.text.fill",
  //       stylers: [{ color: "#9ca5b3" }],
  //     },
  //     {
  //       featureType: "road.highway",
  //       elementType: "geometry",
  //       stylers: [{ color: "#746855" }],
  //     },
  //     {
  //       featureType: "road.highway",
  //       elementType: "geometry.stroke",
  //       stylers: [{ color: "#1f2835" }],
  //     },
  //     {
  //       featureType: "road.highway",
  //       elementType: "labels.text.fill",
  //       stylers: [{ color: "#f3d19c" }],
  //     },
  //     {
  //       featureType: "transit",
  //       elementType: "geometry",
  //       stylers: [{ color: "#2f3948" }],
  //     },
  //     {
  //       featureType: "transit.station",
  //       elementType: "labels.text.fill",
  //       stylers: [{ color: "#d59563" }],
  //     },
  //     {
  //       featureType: "water",
  //       elementType: "geometry",
  //       stylers: [{ color: "#17263c" }],
  //     },
  //     {
  //       featureType: "water",
  //       elementType: "labels.text.fill",
  //       stylers: [{ color: "#515c6d" }],
  //     },
  //     {
  //       featureType: "water",
  //       elementType: "labels.text.stroke",
  //       stylers: [{ color: "#17263c" }],
  //     },
  //   ],
  // };