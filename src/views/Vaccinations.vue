<template>
   <div id="app">
    <v-app id="inspire">
      <v-data-table
        :headers="headers"
        :items="vaccinations"
        sort-by="date"
        class="elevation-1"
      >
        <template v-slot:top>
          <v-toolbar
            flat
          >
            <v-toolbar-title>Vaccinations</v-toolbar-title>
            <v-divider
              class="mx-4"
              inset
              vertical
            ></v-divider>
            <v-spacer></v-spacer>
            <v-dialog
              v-model="dialog"
              max-width="500px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  color="primary"
                  dark
                  class="mb-2"
                  v-bind="attrs"
                  v-on="on"
                >
                  New Item
                </v-btn>
              </template>
              <v-card>
                <v-card-title>
                  <span class="headline">{{ formTitle }}</span>
                </v-card-title>
    
                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col
                        cols="12"
                        sm="6"
                        md="4"
                      >
                        <v-text-field
                          v-model="editedVaccination.hospital"
                          label="Hospital"
                        ></v-text-field>
                      </v-col>
                      <v-col
                        cols="12"
                        sm="6"
                        md="4"
                      >
                        <v-text-field
                          v-model="editedVaccination.patient"
                          label="Patient"
                        ></v-text-field>
                      </v-col>
                      <v-col
                        cols="12"
                        sm="6"
                        md="4"
                      >
                        <v-text-field
                          v-model="editedVaccination.vaccine"
                          label="Vaccine"
                        ></v-text-field>
                      </v-col>
                      <v-col
                        cols="12"
                        sm="6"
                        md="4"
                      >
                        <v-text-field
                          v-model="editedVaccination.date"
                          label="Date"
                        ></v-text-field>
                      </v-col>
                      <v-col
                        cols="12"
                        sm="6"
                        md="4"
                      >
                        <v-text-field
                          v-model="editedVaccination.status"
                          label="Status"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>
    
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                    color="blue darken-1"
                    text
                    @click="close"
                  >
                    Cancel
                  </v-btn>
                  <v-btn
                    color="blue darken-1"
                    text
                    @click="save"
                  >
                    Save
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
            <v-dialog v-model="dialogDelete" max-width="500px">
              <v-card>
                <v-card-title class="headline">Are you sure you want to delete this item?</v-card-title>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
                  <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
                  <v-spacer></v-spacer>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-toolbar>
        </template>
        <template v-slot:item.actions="{ item }">
          <v-icon
            small
            class="mr-2"
            @click="editVaccination(item)"
          >
            mdi-pencil
          </v-icon>
          <v-icon
            small
            @click="deleteVaccination(item)"
          >
            mdi-delete
          </v-icon>
        </template>
        <template v-slot:no-data>
          <v-btn
            color="primary"
            @click="initialize"
          >
            Reset
          </v-btn>
        </template>
      </v-data-table>
    </v-app>
  </div>
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
