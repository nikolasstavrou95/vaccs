<template>
<v-app id="inspire">
    <v-data-table
      :headers="headers"
      :items="vaccinations"
      :items-per-page="5"
      class="elevation-1"
    >
      <template v-slot:[`item.actions`]="{ item }">
        <v-icon small class="mr-2" @click="transferVaccination(item.id)">mdi-account-arrow-right</v-icon>
        <v-icon small @click="editVaccination(item)">mdi-pencil</v-icon>
      </template>  
    </v-data-table>
  </v-app>
</template>

<script>
  
import DataService from "../services/DataService";

export default {
  name: "vaccinations-list",
  data() {
    return {
      vaccinations: [],
      title: "",
      headers: [
        {
          text: 'Hospital',
          align: 'start',
          sortable: false,
          value: 'hospital',
        },
        { text: 'Patient', value: 'patient', sortable: false },
        { text: 'Vaccine', value: 'vaccine', sortable: false },
        { text: 'Date', value: 'date' },
        { text: 'Status', value: 'status' },
        { text: '', value: 'actions', sortable: false },
      ],
    };
  },
  methods: {
    retrieveVaccinations() {
      DataService.getAll()
        .then((response) => {
          this.vaccinations = response.data.map(this.getDisplayVaccination);
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },

    refreshList() {
      this.retrieveVaccinations();
    },

    removeAllVaccinations() {
      DataService.deleteAll()
        .then((response) => {
          console.log(response.data);
          this.refreshList();
        })
        .catch((e) => {
          console.log(e);
        });
    },

    searchTitle() {
      DataService.findByTitle(this.title)
        .then((response) => {
          this.tutorials = response.data.map(this.getDisplayTutorial);
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },

    editVaccination(item) {
        console.log("hi!");
    },

    deleteVaccination(id) {
      DataService.delete(id)
        .then(() => {
          this.refreshList();
        })
        .catch((e) => {
          console.log(e);
        });
    },
    getDisplayVaccination(vaccination) {
      return {
        id: vaccination.id,
        hospital: vaccination.hospital,
        patient: vaccination.patient,
        vaccine: vaccination.vaccine,
        date: vaccination.date,
        status: vaccination.status,
      };
    },
  
  },
  mounted() {
    this.retrieveVaccinations();
  },
};
  
</script>
