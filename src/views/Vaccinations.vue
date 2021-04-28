<template>
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
                Add Vaccination
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
                      md="13"
                    >
                      <v-select
                        :items="patientsList"
                        label="Patient"
                        dense
                      ></v-select>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="13"
                    >
                      <v-select
                        :items="vaccinesList"
                        label="Vaccines"
                        dense
                      ></v-select>
                    </v-col>
                  </v-row>
                  <v-row>                    
                      <v-date-picker
                        v-model="date"
                        :allowed-dates="allowedDates"
                        class="mt-4"
                        full-width
                        min="2016-06-15"
                        max="2018-03-20" 
                      ></v-date-picker>
                  </v-row>
                  <v-row>
                    <v-select
                        :items="timeList"
                        label="Time"
                         dense
                      ></v-select>
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
              <v-card-title class="headline">Are you sure you want to delete this vaccination?</v-card-title>
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
          @click="transferItem(item)"
        >
          mdi-account-arrow-right
        </v-icon>
        <v-icon
          small
          class="mr-2"
          @click="editItem(item)"
        >
          mdi-pencil
        </v-icon>
      </template>
    </v-data-table>
  </v-app>
</template>

<script>
import axios from 'axios';

const baseURL = "http://localhost:3000/vaccinations"

  export default {
    data: () => ({
      dialog: false,
      dialogDelete: false,
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
      vaccinations: [],
      async created() {
        try {
          const res = await axios.get(`http://localhost:3000/vaccinations`)

          this.vaccinations = res.data;
        } catch(e) {
          console.error(e)
        }
      },
      editedIndex: -1,
      editedItem: {
        hospital: '',
        patient: 0,
        vaccine: 0,
        date: 0,
        status: 0,
      },
      defaultItem: {
        hospital: '',
        patient: 0,
        vaccine: 0,
        date: 0,
        status: 0,
      },
      patientsList: ['Nick', 'Mary', 'George'],
      vaccinesList: ['Pfizer', 'AstraZeneca'],
      date: '2018-03-02',
      timeList: ['12:00', '12:30'],
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New Vaccination' : 'Edit Vaccination'
      },
    },

    watch: {
      dialog (val) {
        val || this.close()
      },
      dialogDelete (val) {
        val || this.closeDelete()
      },
    },


    methods: {
    
      //Implement Transfer to an other Hospital
      transferItem () {
        
      },

      editItem (item) {
        this.editedIndex = this.vaccinations.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItemConfirm () {
        this.vaccinations.splice(this.editedIndex, 1)
        this.closeDelete()
      },

      close () {
        this.dialog = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      closeDelete () {
        this.dialogDelete = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
       },

      save () {
        if (this.editedIndex > -1) {
          Object.assign(this.vaccinations[this.editedIndex], this.editedItem)
        } else {
          this.vaccinations.push(this.editedItem)
        }
        this.close()
      },
      allowedDates: val => parseInt(val.split('-')[2], 10) % 2 === 0,
    },
  }
</script>
