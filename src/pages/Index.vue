<template>
  <Layout>
    <template slot="banner">
      <h1 class="title is-uppercase has-text-centered">
        DATOS GBIF DE VENEZUELA
      </h1>
    </template>

    <b-tabs >
      <b-tab-item label="Ocurrencias">

          <b-field>
            <div class="control has-icons-left" style="max-width: 300px;">
              <input class="input" type="search" placeholder="Filtrar">
              <span class="icon is-left">
                <font-awesome :icon="['fas', 'search']"/>
              </span>
            </div>
            <b-button type="is-primary">Aplicar</b-button>
            <b-button icon-right="trash" />
          </b-field>
        </div>

        <b-table
          :data='data'
          :loading='loading'
          hoverable
          paginated
          :pagination-simple='true'
          backend-pagination
          :total='total'
          @click='rowClick'
          @page-change='onPageChange'>
            <b-table-column width="50%" field="scientificName" label="Nombre científico" v-slot="props">
              {{ props.row.scientificName }}
            </b-table-column>
            <b-table-column field="year" label="Año" v-slot="props">
              {{ props.row.year }}
            </b-table-column>
            <b-table-column field="publishingCountry" label="Pais de publicación" v-slot="props">
              {{ props.row.publishingCountry }}
            </b-table-column>
            <b-table-column field="datasetName" label="Conjunto de datos" v-slot="props">
              <a :href="'https://gbif.org/es/dataset/' + props.row.datasetKey">{{props.row.datasetName}}</a>
            </b-table-column>
        </b-table>
      </b-tab-item>
      <b-tab-item label="Conjuntos de datos">
          Lorem <br>
          ipsum <br>
          dolor <br>
          sit <br>
          amet.
      </b-tab-item>
    </b-tabs>

  </Layout>
</template>

<script>
import {getGbifOccurrences} from '~/utils/data'

export default {
  metaInfo: {
    title: 'Hello, world!'
  },
  data() {
    return {
      data: [],
      total: 0,
      loading: false,
      page: 1,
      perPage: 20
    }
  },
  mounted() {
    this.loadGbifOccurrences()
    /*getGbifOccurrences().then((result) => {
      console.log(result)
    }) */
  },
  methods: {
    loadGbifOccurrences(page) {
    this.loading = true
      getGbifOccurrences((page-1)*20).then((result) => {
        this.data = result.data.results
        this.total = result.data.count
        this.loading = false
        console.log(result)
      })
    },
    onPageChange(page) {
      console.log('this is page ', page)
      this.page = page
      this.loadGbifOccurrences(page)
    },
    rowClick(row) {
      console.log(row.gbifID)
      window.location.href=('https://gbif.org/es/occurrence/' + row.gbifID)
    }
  }
}
</script>

<style>

</style>
