<template>
  <q-page class="reviews-page q-pa-md">

    <!-- ================= HEADER ================= -->
    <div class="row items-center justify-between q-mb-lg">

      <div>
        <div class="text-h5 text-weight-bold">
          Reviews
        </div>

        <div class="text-grey-7">
          Manage customer reviews and ratings
        </div>
      </div>

      <q-btn
        color="primary"
        icon="refresh"
        label="Refresh"
        unelevated
        :loading="loading"
        @click="loadReviews"
      />

    </div>


    <!-- ================= STAT CARDS ================= -->
    <div class="row q-col-gutter-md q-mb-lg">

      <!-- TOTAL REVIEWS -->
      <div class="col-12 col-sm-6 col-md-3">

        <q-card class="stat-card">
          <q-card-section>

            <div class="row items-center">

              <q-avatar
                color="blue-1"
                text-color="primary"
                icon="rate_review"
                size="48px"
              />

              <div class="q-ml-md">

                <div class="text-grey-7">
                  Total Reviews
                </div>

                <div class="text-h5 text-weight-bold">
                  {{ reviews.length }}
                </div>

              </div>

            </div>

          </q-card-section>
        </q-card>

      </div>


      <!-- AVERAGE RATING -->
      <div class="col-12 col-sm-6 col-md-3">

        <q-card class="stat-card">
          <q-card-section>

            <div class="row items-center">

              <q-avatar
                color="orange-1"
                text-color="orange"
                icon="star"
                size="48px"
              />

              <div class="q-ml-md">

                <div class="text-grey-7">
                  Average Rating
                </div>

                <div class="row items-center">

                  <div class="text-h5 text-weight-bold">
                    {{ averageRating }}
                  </div>

                  <q-icon
                    name="star"
                    color="orange"
                    size="20px"
                    class="q-ml-xs"
                  />

                </div>

              </div>

            </div>

          </q-card-section>
        </q-card>

      </div>


      <!-- PENDING -->
      <div class="col-12 col-sm-6 col-md-3">

        <q-card class="stat-card">
          <q-card-section>

            <div class="row items-center">

              <q-avatar
                color="purple-1"
                text-color="purple"
                icon="pending"
                size="48px"
              />

              <div class="q-ml-md">

                <div class="text-grey-7">
                  Pending
                </div>

                <div class="text-h5 text-weight-bold">
                  {{ pendingReviews }}
                </div>

              </div>

            </div>

          </q-card-section>
        </q-card>

      </div>


      <!-- 5 STAR -->
      <div class="col-12 col-sm-6 col-md-3">

        <q-card class="stat-card">
          <q-card-section>

            <div class="row items-center">

              <q-avatar
                color="green-1"
                text-color="positive"
                icon="sentiment_very_satisfied"
                size="48px"
              />

              <div class="q-ml-md">

                <div class="text-grey-7">
                  5 Star Reviews
                </div>

                <div class="text-h5 text-weight-bold">
                  {{ fiveStarReviews }}
                </div>

              </div>

            </div>

          </q-card-section>
        </q-card>

      </div>

    </div>


    <!-- ================= RATING DISTRIBUTION ================= -->
    <q-card class="rating-card q-mb-md">

      <q-card-section>

        <div class="text-subtitle1 text-weight-bold q-mb-md">
          Rating Distribution
        </div>

        <div
          v-for="rating in [5, 4, 3, 2, 1]"
          :key="rating"
          class="row items-center q-mb-sm"
        >

          <div class="rating-label">
            {{ rating }}
            <q-icon
              name="star"
              color="orange"
              size="16px"
            />
          </div>

          <div class="col">

            <q-linear-progress
              :value="ratingPercentage(rating)"
              rounded
              size="10px"
              color="orange"
              track-color="grey-3"
            />

          </div>

          <div class="rating-count">
            {{ ratingCount(rating) }}
          </div>

        </div>

      </q-card-section>

    </q-card>


    <!-- ================= FILTER CARD ================= -->
    <q-card class="filter-card q-mb-md">

      <q-card-section>

        <div class="row q-col-gutter-md items-center">

          <!-- SEARCH -->
          <div class="col-12 col-md-5">

            <q-input
              v-model="search"
              outlined
              dense
              clearable
              placeholder="Search customer, driver or review..."
            >

              <template #prepend>
                <q-icon name="search" />
              </template>

            </q-input>

          </div>


          <!-- RATING -->
          <div class="col-12 col-md-3">

            <q-select
              v-model="ratingFilter"
              outlined
              dense
              label="Rating"
              :options="ratingOptions"
              emit-value
              map-options
            />

          </div>


          <!-- STATUS -->
          <div class="col-12 col-md-3">

            <q-select
              v-model="statusFilter"
              outlined
              dense
              label="Status"
              :options="statusOptions"
              emit-value
              map-options
            />

          </div>


          <!-- RESET -->
          <div class="col-12 col-md-1">

            <q-btn
              flat
              round
              icon="refresh"
              color="primary"
              @click="resetFilters"
            >

              <q-tooltip>
                Reset Filters
              </q-tooltip>

            </q-btn>

          </div>

        </div>

      </q-card-section>

    </q-card>


    <!-- ================= REVIEWS TABLE ================= -->
    <q-card class="reviews-table-card">

      <q-table
        :rows="filteredReviews"
        :columns="columns"
        row-key="id"
        flat
        bordered
        :loading="loading"
        :pagination="pagination"
        no-data-label="No reviews found"
      >

        <!-- CUSTOMER -->
        <template #body-cell-customer="props">

          <q-td :props="props">

            <div class="row items-center no-wrap">

              <q-avatar
                size="40px"
                color="primary"
                text-color="white"
              >

                <img
                  v-if="props.row.customerAvatar"
                  :src="props.row.customerAvatar"
                  alt="Customer"
                />

                <span v-else>
                  {{ getInitials(props.row.customerName) }}
                </span>

              </q-avatar>


              <div class="q-ml-sm">

                <div class="text-weight-bold">
                  {{ props.row.customerName }}
                </div>

                <div class="text-caption text-grey-6">
                  {{ props.row.customerMobile }}
                </div>

              </div>

            </div>

          </q-td>

        </template>


        <!-- DRIVER -->
        <template #body-cell-driver="props">

          <q-td :props="props">

            <div class="text-weight-medium">
              {{ props.row.driverName }}
            </div>

            <div class="text-caption text-grey-6">
              {{ props.row.vehicleNumber }}
            </div>

          </q-td>

        </template>


        <!-- RATING -->
        <template #body-cell-rating="props">

          <q-td :props="props">

            <div class="row items-center no-wrap">

              <q-rating
                :model-value="props.row.rating"
                readonly
                size="18px"
                color="orange"
                icon="star_border"
                icon-selected="star"
              />

              <span class="q-ml-xs text-weight-bold">
                {{ props.row.rating }}
              </span>

            </div>

          </q-td>

        </template>


        <!-- REVIEW -->
        <template #body-cell-review="props">

          <q-td :props="props">

            <div class="review-text">
              {{ props.row.review }}
            </div>

          </q-td>

        </template>


        <!-- DATE -->
        <template #body-cell-date="props">

          <q-td :props="props">

            <div>
              {{ formatDate(props.row.createdAt) }}
            </div>

            <div class="text-caption text-grey-6">
              {{ formatTime(props.row.createdAt) }}
            </div>

          </q-td>

        </template>


        <!-- STATUS -->
        <template #body-cell-status="props">

          <q-td :props="props">

            <q-badge
              :color="getStatusColor(props.row.status)"
              class="q-pa-sm"
            >
              {{ formatStatus(props.row.status) }}
            </q-badge>

          </q-td>

        </template>


        <!-- ACTIONS -->
        <template #body-cell-actions="props">

          <q-td
            :props="props"
            class="text-right"
          >

            <!-- VIEW -->
            <q-btn
              flat
              round
              dense
              icon="visibility"
              color="primary"
              @click="viewReview(props.row)"
            >

              <q-tooltip>
                View Review
              </q-tooltip>

            </q-btn>


            <!-- APPROVE -->
            <q-btn
              v-if="props.row.status === 'pending'"
              flat
              round
              dense
              icon="check_circle"
              color="positive"
              @click="approveReview(props.row)"
            >

              <q-tooltip>
                Approve
              </q-tooltip>

            </q-btn>


            <!-- REJECT -->
            <q-btn
              v-if="props.row.status === 'pending'"
              flat
              round
              dense
              icon="cancel"
              color="negative"
              @click="rejectReview(props.row)"
            >

              <q-tooltip>
                Reject
              </q-tooltip>

            </q-btn>


            <!-- REPLY -->
            <q-btn
              flat
              round
              dense
              icon="reply"
              color="secondary"
              @click="openReplyDialog(props.row)"
            >

              <q-tooltip>
                Reply
              </q-tooltip>

            </q-btn>


            <!-- DELETE -->
            <q-btn
              flat
              round
              dense
              icon="delete"
              color="negative"
              @click="deleteReview(props.row)"
            >

              <q-tooltip>
                Delete
              </q-tooltip>

            </q-btn>

          </q-td>

        </template>

      </q-table>

    </q-card>


    <!-- ================================================= -->
    <!-- VIEW REVIEW DIALOG -->
    <!-- ================================================= -->

    <q-dialog v-model="viewDialog">

      <q-card
        style="width: 650px; max-width: 95vw;"
      >

        <q-card-section class="row items-center justify-between">

          <div class="text-h6 text-weight-bold">
            Review Details
          </div>

          <q-btn
            flat
            round
            dense
            icon="close"
            v-close-popup
          />

        </q-card-section>


        <q-separator />


        <q-card-section
          v-if="selectedReview"
        >

          <!-- CUSTOMER -->
          <div class="row items-center q-mb-lg">

            <q-avatar
              size="55px"
              color="primary"
              text-color="white"
            >

              <img
                v-if="selectedReview.customerAvatar"
                :src="selectedReview.customerAvatar"
                alt="Customer"
              />

              <span v-else>
                {{ getInitials(selectedReview.customerName) }}
              </span>

            </q-avatar>


            <div class="q-ml-md">

              <div class="text-h6 text-weight-bold">
                {{ selectedReview.customerName }}
              </div>

              <div class="text-caption text-grey-6">
                {{ selectedReview.customerMobile }}
              </div>

            </div>

          </div>


          <!-- RATING -->
          <div class="q-mb-md">

            <div class="text-subtitle2 text-grey-7 q-mb-xs">
              Rating
            </div>

            <div class="row items-center">

              <q-rating
                :model-value="selectedReview.rating"
                readonly
                size="28px"
                color="orange"
                icon="star_border"
                icon-selected="star"
              />

              <span class="text-h6 q-ml-sm">
                {{ selectedReview.rating }}/5
              </span>

            </div>

          </div>


          <!-- REVIEW -->
          <div class="q-mb-md">

            <div class="text-subtitle2 text-grey-7 q-mb-xs">
              Review
            </div>

            <q-card
              flat
              bordered
              class="review-detail-box"
            >

              <q-card-section>
                {{ selectedReview.review }}
              </q-card-section>

            </q-card>

          </div>


          <!-- DRIVER -->
          <div class="row q-col-gutter-md">

            <div class="col-12 col-md-6">

              <div class="text-caption text-grey-6">
                Driver
              </div>

              <div class="text-weight-bold">
                {{ selectedReview.driverName }}
              </div>

            </div>


            <div class="col-12 col-md-6">

              <div class="text-caption text-grey-6">
                Vehicle
              </div>

              <div class="text-weight-bold">
                {{ selectedReview.vehicleNumber }}
              </div>

            </div>


            <div class="col-12 col-md-6">

              <div class="text-caption text-grey-6">
                Booking ID
              </div>

              <div class="text-weight-bold">
                #{{ selectedReview.bookingId }}
              </div>

            </div>


            <div class="col-12 col-md-6">

              <div class="text-caption text-grey-6">
                Date
              </div>

              <div class="text-weight-bold">
                {{ formatDate(selectedReview.createdAt) }}
              </div>

            </div>

          </div>


          <!-- EXISTING REPLY -->
          <div
            v-if="selectedReview.reply"
            class="q-mt-lg"
          >

            <div class="text-subtitle2 text-grey-7 q-mb-xs">
              Admin Reply
            </div>

            <q-card
              flat
              bordered
              class="reply-box"
            >

              <q-card-section>
                {{ selectedReview.reply }}
              </q-card-section>

            </q-card>

          </div>

        </q-card-section>


        <q-card-actions align="right">

          <q-btn
            flat
            label="Close"
            color="primary"
            v-close-popup
          />

        </q-card-actions>

      </q-card>

    </q-dialog>


    <!-- ================================================= -->
    <!-- REPLY DIALOG -->
    <!-- ================================================= -->

    <q-dialog v-model="replyDialog">

      <q-card
        style="width: 550px; max-width: 95vw;"
      >

        <q-card-section>

          <div class="text-h6 text-weight-bold">
            Reply to Review
          </div>

          <div
            v-if="selectedReview"
            class="text-caption text-grey-6 q-mt-xs"
          >
            {{ selectedReview.customerName }}
          </div>

        </q-card-section>


        <q-separator />


        <q-card-section>

          <q-card
            flat
            bordered
            class="q-mb-md"
          >

            <q-card-section>

              <div class="row items-center q-mb-sm">

                <q-rating
                  :model-value="selectedReview?.rating"
                  readonly
                  size="20px"
                  color="orange"
                  icon="star_border"
                  icon-selected="star"
                />

              </div>

              <div class="text-body2">
                {{ selectedReview?.review }}
              </div>

            </q-card-section>

          </q-card>


          <q-input
            v-model="replyText"
            outlined
            type="textarea"
            label="Your Reply *"
            rows="5"
            maxlength="500"
            counter
          />

        </q-card-section>


        <q-card-actions
          align="right"
          class="q-pa-md"
        >

          <q-btn
            flat
            label="Cancel"
            color="grey-7"
            v-close-popup
          />

          <q-btn
            color="primary"
            label="Send Reply"
            icon="send"
            unelevated
            :loading="saving"
            @click="submitReply"
          />

        </q-card-actions>

      </q-card>

    </q-dialog>

  </q-page>
</template>


<script setup>

import {
  ref,
  computed,
  onMounted
} from 'vue'

import {
  useQuasar
} from 'quasar'

import axios from 'axios'


const $q = useQuasar()


// =====================================================
// STATE
// =====================================================

const loading = ref(false)

const saving = ref(false)

const viewDialog = ref(false)

const replyDialog = ref(false)

const selectedReview = ref(null)

const replyText = ref('')

const search = ref('')

const ratingFilter = ref('all')

const statusFilter = ref('all')


// =====================================================
// FILTER OPTIONS
// =====================================================

const ratingOptions = [

  {
    label: 'All Ratings',
    value: 'all'
  },

  {
    label: '5 Stars',
    value: 5
  },

  {
    label: '4 Stars',
    value: 4
  },

  {
    label: '3 Stars',
    value: 3
  },

  {
    label: '2 Stars',
    value: 2
  },

  {
    label: '1 Star',
    value: 1
  }

]


const statusOptions = [

  {
    label: 'All Status',
    value: 'all'
  },

  {
    label: 'Pending',
    value: 'pending'
  },

  {
    label: 'Approved',
    value: 'approved'
  },

  {
    label: 'Rejected',
    value: 'rejected'
  }

]


// =====================================================
// TABLE COLUMNS
// =====================================================

const columns = [

  {
    name: 'customer',
    label: 'Customer',
    align: 'left'
  },

  {
    name: 'driver',
    label: 'Driver',
    align: 'left'
  },

  {
    name: 'rating',
    label: 'Rating',
    align: 'left'
  },

  {
    name: 'review',
    label: 'Review',
    align: 'left'
  },

  {
    name: 'date',
    label: 'Date',
    align: 'left'
  },

  {
    name: 'status',
    label: 'Status',
    align: 'left'
  },

  {
    name: 'actions',
    label: 'Actions',
    align: 'right'
  }

]


const pagination = ref({

  page: 1,

  rowsPerPage: 10

})


// =====================================================
// SAMPLE REVIEWS
// =====================================================

const reviews = ref([

  {
    id: 1,

    bookingId: 1001,

    customerName: 'Rahul Kumar',

    customerMobile: '9876543210',

    customerAvatar: '',

    driverName: 'Amit Singh',

    vehicleNumber: 'BR01AB1234',

    rating: 5,

    review:
      'Excellent service. Driver was very polite and the vehicle was clean.',

    status: 'approved',

    reply:
      'Thank you for your valuable feedback!',

    createdAt:
      '2026-08-25T10:30:00'

  },


  {
    id: 2,

    bookingId: 1002,

    customerName: 'Priya Sharma',

    customerMobile: '9876543211',

    customerAvatar: '',

    driverName: 'Rakesh Kumar',

    vehicleNumber: 'BR02CD5678',

    rating: 4,

    review:
      'Good experience. Driver arrived on time.',

    status: 'pending',

    reply: '',

    createdAt:
      '2026-08-24T15:20:00'

  },


  {
    id: 3,

    bookingId: 1003,

    customerName: 'Neha Singh',

    customerMobile: '9876543212',

    customerAvatar: '',

    driverName: 'Suresh Kumar',

    vehicleNumber: 'BR05EF9012',

    rating: 3,

    review:
      'Service was okay but the vehicle could have been cleaner.',

    status: 'pending',

    reply: '',

    createdAt:
      '2026-08-23T12:10:00'

  },


  {
    id: 4,

    bookingId: 1004,

    customerName: 'Ankit Verma',

    customerMobile: '9876543213',

    customerAvatar: '',

    driverName: 'Vikas Singh',

    vehicleNumber: 'BR06GH3456',

    rating: 2,

    review:
      'Driver was late and communication was not good.',

    status: 'rejected',

    reply: '',

    createdAt:
      '2026-08-22T18:45:00'

  },


  {
    id: 5,

    bookingId: 1005,

    customerName: 'Pooja Kumari',

    customerMobile: '9876543214',

    customerAvatar: '',

    driverName: 'Deepak Kumar',

    vehicleNumber: 'BR07IJ7890',

    rating: 5,

    review:
      'Very smooth booking experience. Highly recommended.',

    status: 'approved',

    reply: '',

    createdAt:
      '2026-08-21T11:25:00'

  }

])


// =====================================================
// FILTERED REVIEWS
// =====================================================

const filteredReviews = computed(() => {

  const keyword =
    search.value
      .toLowerCase()
      .trim()


  return reviews.value.filter(review => {

    const matchesSearch =

      !keyword ||

      review.customerName
        .toLowerCase()
        .includes(keyword) ||

      review.driverName
        .toLowerCase()
        .includes(keyword) ||

      review.review
        .toLowerCase()
        .includes(keyword) ||

      String(review.bookingId)
        .includes(keyword)


    const matchesRating =

      ratingFilter.value === 'all' ||

      review.rating ===
        Number(ratingFilter.value)


    const matchesStatus =

      statusFilter.value === 'all' ||

      review.status === statusFilter.value


    return (

      matchesSearch &&

      matchesRating &&

      matchesStatus

    )

  })

})


// =====================================================
// STATISTICS
// =====================================================

const averageRating = computed(() => {

  if (!reviews.value.length) {
    return '0.0'
  }


  const total =
    reviews.value.reduce(
      (sum, review) =>
        sum + Number(review.rating),
      0
    )


  return (
    total /
    reviews.value.length
  ).toFixed(1)

})


const pendingReviews = computed(() => {

  return reviews.value.filter(
    review =>
      review.status === 'pending'
  ).length

})


const fiveStarReviews = computed(() => {

  return reviews.value.filter(
    review =>
      review.rating === 5
  ).length

})


// =====================================================
// RATING COUNT
// =====================================================

function ratingCount(rating) {

  return reviews.value.filter(
    review =>
      review.rating === rating
  ).length

}


// =====================================================
// RATING PERCENTAGE
// =====================================================

function ratingPercentage(rating) {

  if (!reviews.value.length) {
    return 0
  }


  return (

    ratingCount(rating) /
    reviews.value.length

  )

}


// =====================================================
// VIEW REVIEW
// =====================================================

function viewReview(review) {

  selectedReview.value =
    review

  viewDialog.value = true

}


// =====================================================
// APPROVE REVIEW
// =====================================================

function approveReview(review) {

  $q.dialog({

    title: 'Approve Review',

    message:
      'Are you sure you want to approve this review?',

    cancel: true,

    persistent: true

  }).onOk(async () => {

    try {

      /*
       * API:
       *
       * await axios.patch(
       *   `/admin/reviews/${review.id}/status`,
       *   {
       *     status: 'approved'
       *   }
       * )
       */


      review.status =
        'approved'


      $q.notify({

        type: 'positive',

        message:
          'Review approved successfully'

      })


    } catch (error) {

      console.error(
        'Approve Review Error:',
        error
      )


      $q.notify({

        type: 'negative',

        message:
          'Unable to approve review'

      })

    }

  })

}


// =====================================================
// REJECT REVIEW
// =====================================================

function rejectReview(review) {

  $q.dialog({

    title: 'Reject Review',

    message:
      'Are you sure you want to reject this review?',

    cancel: true,

    persistent: true

  }).onOk(async () => {

    try {

      /*
       * API:
       *
       * await axios.patch(
       *   `/admin/reviews/${review.id}/status`,
       *   {
       *     status: 'rejected'
       *   }
       * )
       */


      review.status =
        'rejected'


      $q.notify({

        type: 'positive',

        message:
          'Review rejected successfully'

      })


    } catch (error) {

      console.error(
        'Reject Review Error:',
        error
      )


      $q.notify({

        type: 'negative',

        message:
          'Unable to reject review'

      })

    }

  })

}


// =====================================================
// REPLY DIALOG
// =====================================================

function openReplyDialog(review) {

  selectedReview.value =
    review

  replyText.value =
    review.reply || ''

  replyDialog.value = true

}


// =====================================================
// SUBMIT REPLY
// =====================================================

async function submitReply() {

  if (!replyText.value.trim()) {

    $q.notify({

      type: 'negative',

      message:
        'Please enter a reply'

    })

    return

  }


  saving.value = true


  try {

    /*
     * API:
     *
     * await axios.post(
     *   `/admin/reviews/${selectedReview.value.id}/reply`,
     *   {
     *     reply: replyText.value
     *   }
     * )
     */


    selectedReview.value.reply =
      replyText.value.trim()


    $q.notify({

      type: 'positive',

      message:
        'Reply added successfully'

    })


    replyDialog.value = false


  } catch (error) {

    console.error(
      'Review Reply Error:',
      error
    )


    $q.notify({

      type: 'negative',

      message:
        'Unable to send reply'

    })

  } finally {

    saving.value = false

  }

}


// =====================================================
// DELETE REVIEW
// =====================================================

function deleteReview(review) {

  $q.dialog({

    title: 'Delete Review',

    message:
      `Are you sure you want to delete the review from ${review.customerName}?`,

    cancel: true,

    persistent: true

  }).onOk(async () => {

    try {

      /*
       * API:
       *
       * await axios.delete(
       *   `/admin/reviews/${review.id}`
       * )
       */


      reviews.value =
        reviews.value.filter(
          item =>
            item.id !== review.id
        )


      $q.notify({

        type: 'positive',

        message:
          'Review deleted successfully'

      })


    } catch (error) {

      console.error(
        'Delete Review Error:',
        error
      )


      $q.notify({

        type: 'negative',

        message:
          'Unable to delete review'

      })

    }

  })

}


// =====================================================
// RESET FILTERS
// =====================================================

function resetFilters() {

  search.value = ''

  ratingFilter.value = 'all'

  statusFilter.value = 'all'

}


// =====================================================
// STATUS COLOR
// =====================================================

function getStatusColor(status) {

  const colors = {

    pending: 'orange',

    approved: 'positive',

    rejected: 'negative'

  }


  return colors[status] || 'grey'

}


// =====================================================
// FORMAT STATUS
// =====================================================

function formatStatus(status) {

  if (!status) {
    return '-'
  }


  return (

    status
      .charAt(0)
      .toUpperCase() +

    status.slice(1)

  )

}


// =====================================================
// INITIALS
// =====================================================

function getInitials(name) {

  if (!name) {
    return '?'
  }


  return name
    .split(' ')
    .map(word =>
      word.charAt(0)
    )
    .join('')
    .substring(0, 2)
    .toUpperCase()

}


// =====================================================
// DATE FORMAT
// =====================================================

function formatDate(date) {

  if (!date) {
    return '-'
  }


  return new Date(date)
    .toLocaleDateString(
      'en-IN',
      {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
      }
    )

}


// =====================================================
// TIME FORMAT
// =====================================================

function formatTime(date) {

  if (!date) {
    return ''
  }


  return new Date(date)
    .toLocaleTimeString(
      'en-IN',
      {
        hour: '2-digit',
        minute: '2-digit'
      }
    )

}


// =====================================================
// LOAD REVIEWS
// =====================================================

async function loadReviews() {

  loading.value = true


  try {

    /*
     * =================================================
     * BACKEND API
     * =================================================
     *
     * Replace with your actual endpoint.
     *
     * const response = await axios.get(
     *   '/admin/reviews'
     * )
     *
     * reviews.value =
     *   response.data.data
     */


  } catch (error) {

    console.error(
      'Load Reviews Error:',
      error
    )


    $q.notify({

      type: 'negative',

      message:
        'Unable to load reviews'

    })

  } finally {

    loading.value = false

  }

}


// =====================================================
// ON MOUNT
// =====================================================

onMounted(() => {

  loadReviews()

})

</script>


<style scoped>

.reviews-page {
  background: #f5f7fb;
  min-height: 100%;
}


/* ===============================
   STAT CARD
================================ */

.stat-card {

  border-radius: 12px;

  border: 1px solid #e8eaf0;

  box-shadow:
    0 2px 10px rgba(
      0,
      0,
      0,
      0.04
    );

}


/* ===============================
   RATING CARD
================================ */

.rating-card {

  border-radius: 12px;

  border: 1px solid #e8eaf0;

}


/* ===============================
   FILTER CARD
================================ */

.filter-card {

  border-radius: 12px;

  border: 1px solid #e8eaf0;

}


/* ===============================
   TABLE
================================ */

.reviews-table-card {

  border-radius: 12px;

  overflow: hidden;

  border: 1px solid #e8eaf0;

}


/* ===============================
   RATING
================================ */

.rating-label {

  width: 45px;

  font-weight: 600;

}


.rating-count {

  width: 45px;

  text-align: right;

  font-weight: 600;

}


/* ===============================
   REVIEW TEXT
================================ */

.review-text {

  max-width: 280px;

  overflow: hidden;

  text-overflow: ellipsis;

  white-space: nowrap;

}


/* ===============================
   REVIEW DETAIL
================================ */

.review-detail-box {

  background: #f8f9fb;

  border-radius: 10px;

  line-height: 1.6;

}


.reply-box {

  background: #f0f8ff;

  border-radius: 10px;

  line-height: 1.6;

}


/* ===============================
   MOBILE
================================ */

@media (max-width: 768px) {

  .reviews-page {
    padding: 12px !important;
  }


  .review-text {
    max-width: 180px;
  }

}

</style>
