// event pass
var eventBus = new Vue();
//products tab
Vue.component("product-tabs", {
  props: {
    reviews: {
      type: Array,
      required: true
    }
  },
  template: `
  <div>
    <span class="tabs" v-for="(tab,index) in tabs"
    :key="index" @click="selectedTab = tab"
    :class="{ activeTab: selectedTab === tab}">
      {{ tab }}
    </span>

    <div v-show="selectedTab === 'Reviews'">
          <h2>Reviews</h2>
          <p v-if="!reviews.length">No reviews yet</p>
          <ul>
            <li v-for="review in reviews">
              <p>Name: {{ review.name}}</p>
              <p>Rating: {{ review.rating}}</p>
              <p>Review: {{ review.review}}</p>
              <p>Recommend: {{ review.recommend}}</p>
            </li>
            
          </ul>
        </div>
        <product-review v-show="selectedTab === 'Make a Review'"></product-review>
  </div>
  `,
  data() {
    return {
      tabs: ["Reviews", "Make a Review"],
      selectedTab: "Reviews"
    };
  }
});

//product review component
Vue.component("product-review", {
  template: `
  <form class="review-form" @submit.prevent="onSubmit">

      <p v-if="errors.length">
        <b>Please correct the following error(s)</b>
        <ul>
          <li v-for="error in errors">{{ error }}</li>
        </ul>
      </p>
      <p>
        <label for="name">Name:</label>
        <input id="name" v-model="name" placeholder="name">
      </p>
      
      <p>
        <label for="review">Review:</label>      
        <textarea id="review" v-model="review"></textarea>
      </p>
      
      <p>
        <label for="rating">Rating:</label>
        <select id="rating" v-model.number="rating">
          <option>5</option>
          <option>4</option>
          <option>3</option>
          <option>2</option>
          <option>1</option>
        </select>
      </p>

      <p>
        <label for="recommend">Do you recommended this product?</label>
        <input type="radio" v-model="recommend" value="yes"> Yes
        <input type="radio" v-model="recommend" value="no"> No
      </p>
          
      <p>
        <input type="submit" value="Submit">  
      </p>    
    
    </form>
  `,
  data() {
    return {
      name: null,
      review: null,
      rating: null,
      recommend: null,
      errors: []
    };
  },
  methods: {
    onSubmit() {
      this.errors = [];
      if (this.name && this.review && this.rating && this.recommend) {
        let productReview = {
          name: this.name,
          review: this.review,
          rating: this.rating,
          recommend: this.recommend
        };
        console.log(productReview);
        //this.$emit("review-submitted", productReview);
        eventBus.$emit("review-submitted", productReview);

        this.name = null;
        this.review = null;
        this.rating = null;
        this.recommend = null;
      } else {
        if (!this.name) this.errors.push("Name is required");
        if (!this.review) this.errors.push("Review is required");
        if (!this.rating) this.errors.push("Rating is required");
        if (!this.recommend) this.errors.push("Recommend is required");
      }
    }
  }
});

//product details components
Vue.component("productdetails", {
  props: {
    details: {
      type: Array,
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
        <br>
        <br>
        <product-tabs :reviews="reviews"></product-tabs>
        
        
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
      ],
      reviews: []
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
  },
  mounted() {
    eventBus.$on("review-submitted", productReview => {
      this.reviews.push(productReview);
    });
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
