var app = new Vue({
  el: "#app",
  data: {
    product: "Socks",
    description: "This is socks",
    image: "./assets/shocks_green.jpg",
    url: "https://google.com/search?q=socks",
    inStock: true,
    inventory: 100,
    onSale: false,
    details: ["80% cotton", "20% polyester", "Gender-neutral"],
    varients: [
      {
        id: 123,
        varientColor: "green"
      },
      {
        id: 124,
        varientColor: "blue"
      }
    ]
  }
});
