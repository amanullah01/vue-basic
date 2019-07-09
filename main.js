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
        varientColor: "green",
        varientImage: "./assets/shocks_green.jpg"
      },
      {
        id: 124,
        varientColor: "blue",
        varientImage: "./assets/shocks_blue.jpg"
      }
    ],
    cart: 0
  },
  methods: {
    addToCart() {
      this.cart += 1;
    },
    removeFromCart() {
      if (this.cart > 0) {
        this.cart -= 1;
      } else {
        console.log("negetive");
      }
    },
    updateProduct: function(varientImage) {
      this.image = varientImage;
    }
  }
});
