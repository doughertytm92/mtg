<template>
  <div>
    <b-field class="horizontal" label="Find an MTG Card">
      <b-input
        rounded
        v-model="cardText"
        placeholder="Enter card name to search"
        icon="magnify"
        clearable
        @key-up.enter.native="nameSearch"
      ></b-input>
      <b-button @click="nameSearch"> Name Search</b-button>
      <b-dropdown
        v-model="filterOptions"
        multiple
        aria-role="list">
        <template #trigger>
          <b-button
            type="is-primary"
            icon-right="menu-down">
            Selected ({{ filterOptions.length }})
          </b-button>
        </template>
        <b-dropdown-item
          class="filters"
          v-for="option in filterChoices"
          :value="option.id"
          :key="option.id">
          <b-checkbox>{{ option.name }}</b-checkbox>
        </b-dropdown-item>
      </b-dropdown>
    </b-field>
    <b-table
      v-if="searchResults"
      :data="cards"
      ref="table"
      :opened-detailed="defaultOpenedDetails"
      detailed
      detail-key="id"
      :detail-transition="transitionName"
      @details-open="(row) => $buefy.toast.open(`Expanded ${row.name}`)"
      :show-detail-icon="true"
    >
      <b-table-column field="cardmarket_id" label="ID" width="40" sortable v-slot="props">
        <slot :class="props.row.foil ? 'foil': 'standard'">{{ props.row.cardmarket_id }}</slot>
      </b-table-column>
      <b-table-column field="name" label="Card Name" sortable v-slot="props" :searchable="true">
        {{ props.row.name }}
      </b-table-column>
      <b-table-column field="rarity" label="Rarity" sortable v-slot="props">
        {{ props.row.rarity }}
      </b-table-column>
      <b-table-column field="mana_cost" label="Mana Cost" sortable v-slot="props">
        {{ props.row.mana_cost }}
      </b-table-column>
      <template #detail="props">
        <article class="media">
          <figure class="media-left">
            <p class="image is-64x64">
              <img :src="props.row.image_uris.small" @click="enlarge">
            </p>
            <b-modal v-model="enlargeImage">
              <p class="image is-3by2">
                <img :src="props.row.image_uris.normal">
              </p>
            </b-modal>
          </figure>
          <div class="media-content">
            <div class="content">
              <p>
                <strong>{{ props.row.name }}</strong>
                <small>{{ props.row.oracle_text }}</small>
                <br>
              </p>
            </div>
          </div>
        </article>
      </template>
    </b-table>
  </div>
</template>

<script>
const baseUrl = 'https://api.scryfall.com/cards/';
import { mapState, mapMutations } from 'vuex';
//
export default {
  name: "HelloWorld",
  data() {
    return {
      defaultOpenedDetails: [1],
      cardText: '',
      cards: [],
      useTransition: false,
      searchResults: false,
      enlargeImage: false,
      filterChoices: [
        {name: 'Card Type', id: 'type_line'},
        {name: 'Rarity', id: 'rarity'},
        {name: 'Set Name', id: 'set_name'},
        {name: 'Mana Cost', id: 'mana_cost'},
      ],
      filterOptions: [],
    };
  },
  props: {
    msg: String,
  },
  computed: {
    ...mapState(['activeCard']),
    ...mapMutations(['setActiveCard']),
    transitionName() {
      if (this.useTransition) {
        return 'fade';
      } else return 'fade';
    }
  },
  methods: {
    enlarge() {
      this.enlargeImage = true;
    },
    async nameSearch () {
      const url = baseUrl + 'search?order=name&q=' + this.cardText;
      const resp = await fetch(url);
      const data = await resp.json();
      if (data) this.searchResults = true;
      this.$store.commit('setActiveCard', data.data[0]);
      this.cards = data.data;
    },
    async comboSearch () {
      const url = baseUrl + 'search?' + this.cardText;
      const resp = await fetch(url);
      const data = await resp.json();
      if (data) this.searchResults = true;
      //this.$store.commit('setActiveCard', data.data[0]);
      this.cards = data.data;
    }
  },
}
</script>

<style scoped lang="scss">
.filters {
  align-content: left;
}
ul {
  list-style-type: none;
  padding: 0;
}
.horizontal {
  display: inline-block;
}
.foil {
  background-color: rgb(0, 247, 255);
}
.standard {
  background-color: white;
}
a {
  color: #2c54ac;
}
</style>
