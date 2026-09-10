```vue
<template>
  <q-page class="vehicle-details-page">

    <!-- =====================================================
         TOP HEADER
    ====================================================== -->
    <div class="page-header">

      <div>
        <div class="page-title">
          Vehicle Details
        </div>

        <div class="page-subtitle">
          View vehicle information and book your ride.
        </div>
      </div>

      <q-btn
        flat
        color="primary"
        icon="arrow_back"
        label="Back to Search"
        @click="goBack"
      />

    </div>


    <!-- =====================================================
         VEHICLE DETAILS
    ====================================================== -->
    <q-card class="details-card">

      <div class="row">

        <!-- =================================================
             VEHICLE IMAGE
        ================================================== -->
        <div class="col-12 col-md-5">

          <div class="vehicle-image">

            <q-icon
              name="directions_car"
              size="150px"
              color="primary"
            />

            <q-badge
              color="positive"
              label="Available"
              rounded
              class="availability-badge"
            />

          </div>

        </div>


        <!-- =================================================
             VEHICLE INFORMATION
        ================================================== -->
        <div class="col-12 col-md-7">

          <q-card-section class="vehicle-info">

            <!-- NAME -->
            <div class="row items-start justify-between">

              <div>

                <div class="vehicle-name">
                  {{ vehicle.name }}
                </div>

                <div class="vehicle-type">
                  {{ vehicle.type }}
                </div>

              </div>

              <q-rating
                v-model="vehicle.rating"
                size="24px"
                color="orange"
                icon="star_border"
                icon-selected="star"
                readonly
              />

            </div>


            <!-- DESCRIPTION -->
            <div class="vehicle-description q-mt-md">
              {{ vehicle.description }}
            </div>


            <!-- FEATURES -->
            <div class="features-grid q-mt-lg">

              <div class="feature-box">

                <q-icon
                  name="people"
                  color="primary"
                  size="28px"
                />

                <div>
                  <div class="feature-label">
                    Seats
                  </div>

                  <div class="feature-value">
                    {{ vehicle.seats }} Passengers
                  </div>
                </div>

              </div>


              <div class="feature-box">

                <q-icon
                  name="ac_unit"
                  color="primary"
                  size="28px"
                />

                <div>
                  <div class="feature-label">
                    AC
                  </div>

                  <div class="feature-value">
                    {{ vehicle.ac ? 'Available' : 'Not Available' }}
                  </div>
                </div>

              </div>


              <div class="feature-box">

                <q-icon
                  name="person"
                  color="primary"
                  size="28px"
                />

                <div>
                  <div class="feature-label">
                    Driver
                  </div>

                  <div class="feature-value">
                    {{ vehicle.driver ? 'Included' : 'Not Included' }}
                  </div>
                </div>

              </div>


              <div class="feature-box">

                <q-icon
                  name="work"
                  color="primary"
                  size="28px"
                />

                <div>
                  <div class="feature-label">
                    Luggage
                  </div>

                  <div class="feature-value">
                    {{ vehicle.luggage }}
                  </div>
                </div>

              </div>

            </div>


            <q-separator class="q-my-lg" />


            <!-- PRICE -->
            <div class="price-section">

              <div>

                <div class="price-label">
                  Starting from
                </div>

                <div class="price">
                  ₹{{ vehicle.price }}
                </div>

                <div class="price-unit">
                  per trip
                </div>

              </div>


              <q-btn
                unelevated
                rounded
                color="primary"
                size="lg"
                icon="event_available"
                label="Book Now"
                @click="bookVehicle"
              />

            </div>

          </q-card-section>

        </div>

      </div>

    </q-card>


    <!-- =====================================================
         VEHICLE FEATURES
    ====================================================== -->
    <div class="row q-col-gutter-lg q-mt-lg">


      <!-- FEATURES -->
      <div class="col-12 col-md-7">

        <q-card class="info-card">

          <q-card-section>

            <div class="section-title">

              <q-icon
                name="check_circle"
                color="primary"
                size="25px"
              />

              Vehicle Features

            </div>

          </q-card-section>

          <q-separator />

          <q-card-section>

            <div class="feature-list">

              <div class="feature-item">
                <q-icon
                  name="check"
                  color="positive"
                />
                Comfortable seating
              </div>

              <div class="feature-item">
                <q-icon
                  name="check"
                  color="positive"
                />
                Air conditioning
              </div>

              <div class="feature-item">
                <q-icon
                  name="check"
                  color="positive"
                />
                Clean and well maintained
              </div>

              <div class="feature-item">
                <q-icon
                  name="check"
                  color="positive"
                />
                Experienced driver
              </div>

              <div class="feature-item">
                <q-icon
                  name="check"
                  color="positive"
                />
                Ample luggage space
              </div>

              <div class="feature-item">
                <q-icon
                  name="check"
                  color="positive"
                />
                Safe and reliable travel
              </div>

            </div>

          </q-card-section>

        </q-card>

      </div>


      <!-- BOOKING SUMMARY -->
      <div class="col-12 col-md-5">

        <q-card class="info-card">

          <q-card-section>

            <div class="section-title">

              <q-icon
                name="receipt_long"
                color="primary"
                size="25px"
              />

              Booking Summary

            </div>

          </q-card-section>

          <q-separator />

          <q-card-section>

            <div class="summary-row">
              <span>Vehicle</span>
              <strong>{{ vehicle.name }}</strong>
            </div>

            <div class="summary-row">
              <span>Type</span>
              <strong>{{ vehicle.type }}</strong>
            </div>

            <div class="summary-row">
              <span>Passengers</span>
              <strong>{{ vehicle.seats }}</strong>
            </div>

            <div class="summary-row">
              <span>Driver</span>
              <strong>
                {{ vehicle.driver ? 'Included' : 'Not Included' }}
              </strong>
            </div>

            <q-separator class="q-my-md" />

            <div class="summary-total">

              <span>
                Estimated Price
              </span>

              <strong>
                ₹{{ vehicle.price }}
              </strong>

            </div>

          </q-card-section>

        </q-card>

      </div>

    </div>


    <!-- =====================================================
         IMPORTANT INFORMATION
    ====================================================== -->
    <q-card class="info-card q-mt-lg">

      <q-card-section>

        <div class="section-title">

          <q-icon
            name="info"
            color="primary"
            size="25px"
          />

          Important Information

        </div>

      </q-card-section>

      <q-separator />

      <q-card-section>

        <div class="information-list">

          <div>
            <q-icon
              name="check_circle"
              color="positive"
            />

            Vehicle availability is subject to confirmation.
          </div>

          <div>
            <q-icon
              name="check_circle"
              color="positive"
            />

            Final fare may vary based on distance and trip duration.
          </div>

          <div>
            <q-icon
              name="check_circle"
              color="positive"
            />

            Please provide accurate pickup and drop-off locations.
          </div>

          <div>
            <q-icon
              name="check_circle"
              color="positive"
            />

            Booking confirmation will be shown after successful booking.
          </div>

        </div>

      </q-card-section>

    </q-card>

  </q-page>
</template>


<script setup>

import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'


// =====================================================
// ROUTER
// =====================================================

const router = useRouter()
const route = useRoute()


// =====================================================
// VEHICLE DATA
// =====================================================

const vehicleId = Number(route.query.id) || 1


const allVehicles = {

  1: {
    id: 1,
    name: 'Toyota Innova Crysta',
    type: 'MPV',
    seats: 7,
    ac: true,
    driver: true,
    luggage: 'Large',
    price: '2,500',
    rating: 5,
    description:
      'A spacious and comfortable vehicle suitable for family trips, group travel and long-distance journeys.'
  },

  2: {
    id: 2,
    name: 'Mahindra Scorpio',
    type: 'SUV',
    seats: 7,
    ac: true,
    driver: true,
    luggage: 'Large',
    price: '2,800',
    rating: 4,
    description:
      'A powerful SUV offering comfortable seating and a smooth travel experience for city and long-distance trips.'
  },

  3: {
    id: 3,
    name: 'Maruti Ertiga',
    type: 'MPV',
    seats: 6,
    ac: true,
    driver: true,
    luggage: 'Medium',
    price: '2,000',
    rating: 4,
    description:
      'A practical and comfortable MPV ideal for family travel and small groups.'
  },

  4: {
    id: 4,
    name: 'Hyundai Aura',
    type: 'Sedan',
    seats: 4,
    ac: true,
    driver: false,
    luggage: 'Medium',
    price: '1,500',
    rating: 4,
    description:
      'A comfortable sedan suitable for small families and convenient city travel.'
  },

  5: {
    id: 5,
    name: 'Maruti Swift',
    type: 'Hatchback',
    seats: 4,
    ac: true,
    driver: false,
    luggage: 'Small',
    price: '1,200',
    rating: 4,
    description:
      'A compact and economical vehicle suitable for comfortable city travel.'
  }

}


// =====================================================
// SELECT VEHICLE
// =====================================================

const vehicle = ref(
  allVehicles[vehicleId] || allVehicles[1]
)


// =====================================================
// BOOK VEHICLE
// =====================================================

const bookVehicle = () => {

  router.push({
    path: '/customer/booking',
    query: {
      vehicleId: vehicle.value.id,
      vehicleName: vehicle.value.name,
      vehicleType: vehicle.value.type,
      price: vehicle.value.price
    }
  })

}


// =====================================================
// BACK
// =====================================================

const goBack = () => {

  router.push('/customer/search-vehicle')

}

</script>


<style scoped>

/* =====================================================
   PAGE
===================================================== */

.vehicle-details-page {
  min-height: 100%;
  padding: 28px;
  background: #f5f7fb;
}


/* =====================================================
   PAGE HEADER
===================================================== */

.page-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
}

.page-title {
  color: #172033;
  font-size: 28px;
  font-weight: 700;
}

.page-subtitle {
  margin-top: 5px;
  color: #6b7280;
  font-size: 15px;
}


/* =====================================================
   MAIN CARD
===================================================== */

.details-card {
  overflow: hidden;
  border-radius: 18px;
  background: white;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.05);
}


/* =====================================================
   VEHICLE IMAGE
===================================================== */

.vehicle-image {
  position: relative;

  display: flex;
  align-items: center;
  justify-content: center;

  height: 100%;
  min-height: 420px;

  background: #eef4fb;
}

.availability-badge {
  position: absolute;
  top: 20px;
  left: 20px;

  padding: 8px 14px;
  font-size: 13px;
}


/* =====================================================
   VEHICLE INFO
===================================================== */

.vehicle-info {
  padding: 32px;
}

.vehicle-name {
  color: #172033;
  font-size: 29px;
  font-weight: 700;
}

.vehicle-type {
  margin-top: 5px;
  color: #7b8494;
  font-size: 15px;
}

.vehicle-description {
  color: #5f6878;
  font-size: 15px;
  line-height: 1.7;
}


/* =====================================================
   FEATURES
===================================================== */

.features-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.feature-box {
  display: flex;
  align-items: center;
  gap: 12px;

  padding: 14px;

  border-radius: 12px;
  background: #f7f9fc;
}

.feature-label {
  color: #7b8494;
  font-size: 12px;
}

.feature-value {
  margin-top: 2px;
  color: #172033;
  font-size: 14px;
  font-weight: 600;
}


/* =====================================================
   PRICE
===================================================== */

.price-section {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.price-label {
  color: #7b8494;
  font-size: 13px;
}

.price {
  color: #1976d2;
  font-size: 30px;
  font-weight: 700;
}

.price-unit {
  color: #7b8494;
  font-size: 12px;
}


/* =====================================================
   INFO CARD
===================================================== */

.info-card {
  border-radius: 16px;
  background: white;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.04);
}

.section-title {
  display: flex;
  align-items: center;
  gap: 10px;

  color: #172033;
  font-size: 19px;
  font-weight: 700;
}


/* =====================================================
   FEATURE LIST
===================================================== */

.feature-list {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.feature-item {
  display: flex;
  align-items: center;
  gap: 9px;

  color: #4f5969;
  font-size: 14px;
}


/* =====================================================
   SUMMARY
===================================================== */

.summary-row {
  display: flex;
  justify-content: space-between;
  gap: 15px;

  padding: 9px 0;

  color: #6b7280;
  font-size: 14px;
}

.summary-row strong {
  color: #172033;
  text-align: right;
}

.summary-total {
  display: flex;
  justify-content: space-between;
  align-items: center;

  color: #172033;
  font-size: 15px;
}

.summary-total strong {
  color: #1976d2;
  font-size: 22px;
}


/* =====================================================
   INFORMATION
===================================================== */

.information-list {
  display: grid;
  gap: 13px;
}

.information-list div {
  display: flex;
  align-items: flex-start;
  gap: 9px;

  color: #5f6878;
  font-size: 14px;
}


/* =====================================================
   MOBILE
===================================================== */

@media (max-width: 768px) {

  .vehicle-details-page {
    padding: 16px;
  }

  .page-header {
    align-items: flex-start;
    flex-direction: column;
    gap: 12px;
  }

  .page-title {
    font-size: 23px;
  }

  .vehicle-image {
    min-height: 250px;
  }

  .vehicle-info {
    padding: 20px;
  }

  .vehicle-name {
    font-size: 23px;
  }

  .features-grid {
    grid-template-columns: 1fr;
  }

  .feature-list {
    grid-template-columns: 1fr;
  }

  .price-section {
    align-items: flex-start;
    flex-direction: column;
    gap: 15px;
  }

  .price-section .q-btn {
    width: 100%;
  }

}

</style>
```
