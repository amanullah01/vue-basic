//Product component
Vue.component("product", {
  props: {
    premium: {
      type: Boolean,
      required: true
    }
  },
  template: `<div class="product">
        <div class="product-image">
          <img v-bind:src="image" v-bind:alt="description" />
          <a v-show="inStock" :href="url" target="_blank">Get Voucher code</a>
        </div>
        <div class="product-info">
          <h1>{{ title }}</h1>
          <span class="onSale" v-if="onSale">On Sale</span>
          <p v-if="inStock">In Stock ({{ inventory }})</p>
          <!-- <p v-else-if="inventory > 0 && inventory <=10">
            All most sold out
          </p> -->
          <p v-else :class="{outStock: !inStock}">Out of Stock</p>
          <p>Shipping is: {{shipping}}</p>
          <ul>
            <li v-for="detail in details">{{ detail }}</li>
          </ul>

          <div
            v-for="(varient,index) in varients"
            :key="varient.id"
            class="color-box"
            :style="{backgroundColor: varient.varientColor}"
            @mouseover="updateProduct(index)"
          ></div>

          <div>
            <button
              v-on:click="addToCart"
              :disabled="!inStock"
              :class="{disabledButton : !inStock}"
            >
              Add to cart
            </button>
            <!-- <button @click="removeFromCart" :disabled="cart<1">-</button> -->
            <button
              v-on:click="removeFromCart"
              :disabled="cart<1"
              :class="{disabledButton: cart<1}"
            >
              -
            </button>
          </div>
          <div class="cart">
            <p>Cart({{ cart }})</p>
          </div>
        </div>
      </div>`,
  data() {
    return {
      product: "Socks",
      brand: "Bata",
      description: "This is socks",
      //image: "./assets/shocks_green.jpg",
      selectedVarient: 0,
      url: "https://google.com/search?q=socks",
      //inStock: true,
      inventory: 100,
      onSale: false,
      details: ["80% cotton", "20% polyester", "Gender-neutral"],
      varients: [
        {
          id: 123,
          varientColor: "green",
          varientImage: "./assets/shocks_green.jpg",
          varientQuantity: 10
        },
        {
          id: 124,
          varientColor: "blue",
          varientImage: "./assets/shocks_blue.jpg",
          varientQuantity: 0
        }
      ],
      cart: 0
    };
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
    updateProduct: function(index) {
      this.selectedVarient = index;
    }
  },
  computed: {
    title() {
      return this.brand + " " + this.product;
    },
    image() {
      return this.varients[this.selectedVarient].varientImage;
    },
    inStock() {
      return this.varients[this.selectedVarient].varientQuantity;
    },
    shipping() {
      return this.premium ? "Free" : "$2.99";
    }
  }
});

var app = new Vue({
  el: "#app",
  data: {
    premium: false
  }
});
