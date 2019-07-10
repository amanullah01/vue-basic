//product details components
Vue.component("productdetails", {
  props: {
    details: {
      type: String,
      required: true
    }
  },
  template: `
  <ul>
    <li v-for="detail in details">{{ detail }}</li>
  </ul>
  `,
  data() {
    return {};
  }
});

//Product component
Vue.component("product", {
  //props: ["premium", "cLen"],
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
          <productdetails :details="details"></productdetails>

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
            >
              -
            </button>
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
          id: 1,
          varientColor: "green",
          varientImage: "./assets/shocks_green.jpg",
          varientQuantity: 10
        },
        {
          id: 2,
          varientColor: "blue",
          varientImage: "./assets/shocks_blue.jpg",
          varientQuantity: 0
        }
      ]
    };
  },
  methods: {
    addToCart() {
      this.$emit("add-to-cart", this.varients[this.selectedVarient].id);
    },
    removeFromCart() {
      this.$emit("remove-to-cart", this.varients[this.selectedVarient].id);
      // if (this.cart > 0) {
      //   this.cart -= 1;
      // } else {
      //   console.log("negetive");
      // }
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
    premium: true,
    cart: []
  },
  methods: {
    updateCart(id) {
      console.log(id);
      //this.cart += 1;
      this.cart.push(id);
    },
    removeCart(id) {
      console.log(id);
      if (this.cart.length > 0) {
        this.cart.pop();
      }
    }
  },
  computed: {
    cartLength() {
      return this.cart.length;
    }
  }
});
