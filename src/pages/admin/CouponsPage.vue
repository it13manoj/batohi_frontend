<template>
  <q-page class="coupons-page q-pa-md">

    <!-- ================= HEADER ================= -->
    <div class="row items-center justify-between q-mb-lg">

      <div>
        <div class="text-h5 text-weight-bold">
          Coupons
        </div>

        <div class="text-grey-7">
          Manage promotional coupons and discounts
        </div>
      </div>

      <q-btn
        color="primary"
        icon="add"
        label="Add Coupon"
        unelevated
        @click="openAddDialog"
      />

    </div>


    <!-- ================= STAT CARDS ================= -->
    <div class="row q-col-gutter-md q-mb-lg">

      <div class="col-12 col-sm-6 col-md-3">
        <q-card class="stat-card">
          <q-card-section>

            <div class="row items-center">
              <q-avatar
                color="blue-1"
                text-color="primary"
                icon="confirmation_number"
                size="48px"
              />

              <div class="q-ml-md">
                <div class="text-grey-7">
                  Total Coupons
                </div>

                <div class="text-h5 text-weight-bold">
                  {{ coupons.length }}
                </div>
              </div>
            </div>

          </q-card-section>
        </q-card>
      </div>


      <div class="col-12 col-sm-6 col-md-3">
        <q-card class="stat-card">
          <q-card-section>

            <div class="row items-center">
              <q-avatar
                color="green-1"
                text-color="positive"
                icon="check_circle"
                size="48px"
              />

              <div class="q-ml-md">
                <div class="text-grey-7">
                  Active
                </div>

                <div class="text-h5 text-weight-bold">
                  {{ activeCoupons }}
                </div>
              </div>
            </div>

          </q-card-section>
        </q-card>
      </div>


      <div class="col-12 col-sm-6 col-md-3">
        <q-card class="stat-card">
          <q-card-section>

            <div class="row items-center">
              <q-avatar
                color="orange-1"
                text-color="orange"
                icon="schedule"
                size="48px"
              />

              <div class="q-ml-md">
                <div class="text-grey-7">
                  Upcoming
                </div>

                <div class="text-h5 text-weight-bold">
                  {{ upcomingCoupons }}
                </div>
              </div>
            </div>

          </q-card-section>
        </q-card>
      </div>


      <div class="col-12 col-sm-6 col-md-3">
        <q-card class="stat-card">
          <q-card-section>

            <div class="row items-center">
              <q-avatar
                color="red-1"
                text-color="negative"
                icon="cancel"
                size="48px"
              />

              <div class="q-ml-md">
                <div class="text-grey-7">
                  Expired
                </div>

                <div class="text-h5 text-weight-bold">
                  {{ expiredCoupons }}
                </div>
              </div>
            </div>

          </q-card-section>
        </q-card>
      </div>

    </div>


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
              placeholder="Search coupon code..."
              clearable
            >
              <template #prepend>
                <q-icon name="search" />
              </template>
            </q-input>

          </div>


          <!-- STATUS -->
          <div class="col-12 col-md-3">

            <q-select
              v-model="statusFilter"
              :options="statusOptions"
              outlined
              dense
              label="Status"
              emit-value
              map-options
            />

          </div>


          <!-- DISCOUNT TYPE -->
          <div class="col-12 col-md-3">

            <q-select
              v-model="discountFilter"
              :options="discountOptions"
              outlined
              dense
              label="Discount Type"
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


    <!-- ================= COUPON TABLE ================= -->
    <q-card class="coupon-table-card">

      <q-card-section class="q-pa-none">

        <q-table
          :rows="filteredCoupons"
          :columns="columns"
          row-key="id"
          flat
          bordered
          :pagination="pagination"
          :loading="loading"
          no-data-label="No coupons found"
        >

          <!-- COUPON CODE -->
          <template #body-cell-code="props">

            <q-td :props="props">

              <div class="row items-center no-wrap">

                <q-avatar
                  color="primary"
                  text-color="white"
                  size="36px"
                  icon="local_offer"
                />

                <div class="q-ml-sm">

                  <div class="text-weight-bold">
                    {{ props.row.code }}
                  </div>

                  <div class="text-caption text-grey-6">
                    {{ props.row.description }}
                  </div>

                </div>

              </div>

            </q-td>

          </template>


          <!-- DISCOUNT -->
          <template #body-cell-discount="props">

            <q-td :props="props">

              <q-badge
                color="blue-1"
                text-color="primary"
                class="q-pa-sm"
              >

                <span v-if="props.row.discountType === 'percentage'">
                  {{ props.row.discountValue }}%
                </span>

                <span v-else>
                  ₹{{ props.row.discountValue }}
                </span>

              </q-badge>

            </q-td>

          </template>


          <!-- MINIMUM AMOUNT -->
          <template #body-cell-minAmount="props">

            <q-td :props="props">
              ₹{{ props.row.minAmount }}
            </q-td>

          </template>


          <!-- VALIDITY -->
          <template #body-cell-validity="props">

            <q-td :props="props">

              <div class="text-body2">
                {{ formatDate(props.row.startDate) }}
              </div>

              <div class="text-caption text-grey-6">
                to {{ formatDate(props.row.endDate) }}
              </div>

            </q-td>

          </template>


          <!-- USAGE -->
          <template #body-cell-usage="props">

            <q-td :props="props">

              <div>
                {{ props.row.usedCount }}
                /
                {{ props.row.usageLimit || '∞' }}
              </div>

              <q-linear-progress
                v-if="props.row.usageLimit"
                :value="props.row.usedCount / props.row.usageLimit"
                rounded
                size="6px"
                class="q-mt-xs"
              />

            </q-td>

          </template>


          <!-- STATUS -->
          <template #body-cell-status="props">

            <q-td :props="props">

              <q-toggle
                v-model="props.row.active"
                color="positive"
                @update:model-value="toggleCoupon(props.row)"
              />

              <q-badge
                :color="props.row.active ? 'positive' : 'grey'"
                class="q-ml-sm"
              >
                {{ props.row.active ? 'Active' : 'Inactive' }}
              </q-badge>

            </q-td>

          </template>


          <!-- ACTIONS -->
          <template #body-cell-actions="props">

            <q-td :props="props">

              <q-btn
                flat
                round
                dense
                icon="edit"
                color="primary"
                @click="openEditDialog(props.row)"
              >
                <q-tooltip>
                  Edit Coupon
                </q-tooltip>
              </q-btn>


              <q-btn
                flat
                round
                dense
                icon="delete"
                color="negative"
                @click="deleteCoupon(props.row)"
              >
                <q-tooltip>
                  Delete Coupon
                </q-tooltip>
              </q-btn>

            </q-td>

          </template>

        </q-table>

      </q-card-section>

    </q-card>


    <!-- ================= ADD / EDIT DIALOG ================= -->
    <q-dialog v-model="couponDialog">

      <q-card style="width: 700px; max-width: 95vw;">

        <!-- DIALOG HEADER -->
        <q-card-section class="row items-center justify-between">

          <div class="text-h6 text-weight-bold">
            {{ isEdit ? 'Edit Coupon' : 'Add Coupon' }}
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


        <!-- FORM -->
        <q-card-section>

          <div class="row q-col-gutter-md">

            <!-- CODE -->
            <div class="col-12 col-md-6">

              <q-input
                v-model="form.code"
                outlined
                label="Coupon Code *"
                placeholder="e.g. BAT10"
                maxlength="20"
                :rules="[
                  val => !!val || 'Coupon code is required'
                ]"
              />

            </div>


            <!-- DISCOUNT TYPE -->
            <div class="col-12 col-md-6">

              <q-select
                v-model="form.discountType"
                outlined
                label="Discount Type *"
                :options="[
                  {
                    label: 'Percentage',
                    value: 'percentage'
                  },
                  {
                    label: 'Fixed Amount',
                    value: 'fixed'
                  }
                ]"
                emit-value
                map-options
              />

            </div>


            <!-- DISCOUNT VALUE -->
            <div class="col-12 col-md-6">

              <q-input
                v-model.number="form.discountValue"
                outlined
                type="number"
                :label="
                  form.discountType === 'percentage'
                    ? 'Discount Percentage *'
                    : 'Discount Amount *'
                "
                min="0"
              >

                <template #prepend>
                  <q-icon name="percent" v-if="form.discountType === 'percentage'" />
                  <q-icon name="currency_rupee" v-else />
                </template>

              </q-input>

            </div>


            <!-- MAX DISCOUNT -->
            <div
              v-if="form.discountType === 'percentage'"
              class="col-12 col-md-6"
            >

              <q-input
                v-model.number="form.maxDiscount"
                outlined
                type="number"
                label="Maximum Discount"
                min="0"
              />

            </div>


            <!-- MIN BOOKING -->
            <div class="col-12 col-md-6">

              <q-input
                v-model.number="form.minAmount"
                outlined
                type="number"
                label="Minimum Booking Amount"
                min="0"
              />

            </div>


            <!-- USAGE LIMIT -->
            <div class="col-12 col-md-6">

              <q-input
                v-model.number="form.usageLimit"
                outlined
                type="number"
                label="Usage Limit"
                min="1"
                hint="Leave empty for unlimited usage"
              />

            </div>


            <!-- START DATE -->
            <div class="col-12 col-md-6">

              <q-input
                v-model="form.startDate"
                outlined
                label="Start Date *"
                readonly
              >

                <template #append>

                  <q-icon
                    name="event"
                    class="cursor-pointer"
                  >

                    <q-popup-proxy
                      cover
                      transition-show="scale"
                      transition-hide="scale"
                    >

                      <q-date
                        v-model="form.startDate"
                        mask="YYYY-MM-DD"
                      />

                    </q-popup-proxy>

                  </q-icon>

                </template>

              </q-input>

            </div>


            <!-- END DATE -->
            <div class="col-12 col-md-6">

              <q-input
                v-model="form.endDate"
                outlined
                label="End Date *"
                readonly
              >

                <template #append>

                  <q-icon
                    name="event"
                    class="cursor-pointer"
                  >

                    <q-popup-proxy
                      cover
                      transition-show="scale"
                      transition-hide="scale"
                    >

                      <q-date
                        v-model="form.endDate"
                        mask="YYYY-MM-DD"
                      />

                    </q-popup-proxy>

                  </q-icon>

                </template>

              </q-input>

            </div>


            <!-- DESCRIPTION -->
            <div class="col-12">

              <q-input
                v-model="form.description"
                outlined
                type="textarea"
                label="Description"
                rows="3"
              />

            </div>


            <!-- ACTIVE -->
            <div class="col-12">

              <q-toggle
                v-model="form.active"
                label="Coupon Active"
                color="positive"
              />

            </div>

          </div>

        </q-card-section>


        <q-separator />


        <!-- DIALOG ACTIONS -->
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
            :label="isEdit ? 'Update Coupon' : 'Create Coupon'"
            unelevated
            :loading="saving"
            @click="saveCoupon"
          />

        </q-card-actions>

      </q-card>

    </q-dialog>

  </q-page>
</template>


<script setup>

import { ref, computed, onMounted } from 'vue'
import { useQuasar } from 'quasar'
import axios from 'axios'

const $q = useQuasar()


// =====================================================
// STATE
// =====================================================

const loading = ref(false)
const saving = ref(false)

const couponDialog = ref(false)
const isEdit = ref(false)

const search = ref('')
const statusFilter = ref('all')
const discountFilter = ref('all')


// =====================================================
// FORM
// =====================================================

const defaultForm = () => ({
  id: null,
  code: '',
  description: '',
  discountType: 'percentage',
  discountValue: 10,
  maxDiscount: 0,
  minAmount: 0,
  usageLimit: null,
  usedCount: 0,
  startDate: '',
  endDate: '',
  active: true
})

const form = ref(defaultForm())


// =====================================================
// OPTIONS
// =====================================================

const statusOptions = [
  {
    label: 'All Status',
    value: 'all'
  },
  {
    label: 'Active',
    value: 'active'
  },
  {
    label: 'Inactive',
    value: 'inactive'
  }
]


const discountOptions = [
  {
    label: 'All Types',
    value: 'all'
  },
  {
    label: 'Percentage',
    value: 'percentage'
  },
  {
    label: 'Fixed Amount',
    value: 'fixed'
  }
]


// =====================================================
// TABLE COLUMNS
// =====================================================

const columns = [
  {
    name: 'code',
    label: 'Coupon',
    align: 'left',
    field: 'code',
    sortable: true
  },

  {
    name: 'discount',
    label: 'Discount',
    align: 'left',
    field: 'discountValue',
    sortable: true
  },

  {
    name: 'minAmount',
    label: 'Min. Booking',
    align: 'left',
    field: 'minAmount',
    sortable: true
  },

  {
    name: 'validity',
    label: 'Validity',
    align: 'left'
  },

  {
    name: 'usage',
    label: 'Usage',
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


// =====================================================
// PAGINATION
// =====================================================

const pagination = ref({
  page: 1,
  rowsPerPage: 10
})


// =====================================================
// COUPONS DATA
// =====================================================

const coupons = ref([
  {
    id: 1,
    code: 'BAT10',
    description: '10% off on your booking',
    discountType: 'percentage',
    discountValue: 10,
    maxDiscount: 500,
    minAmount: 1000,
    usageLimit: 100,
    usedCount: 35,
    startDate: '2026-08-01',
    endDate: '2026-09-30',
    active: true
  },

  {
    id: 2,
    code: 'WELCOME500',
    description: 'Welcome discount for new users',
    discountType: 'fixed',
    discountValue: 500,
    maxDiscount: 0,
    minAmount: 2000,
    usageLimit: 50,
    usedCount: 18,
    startDate: '2026-08-01',
    endDate: '2026-10-15',
    active: true
  },

  {
    id: 3,
    code: 'FIRST20',
    description: '20% discount for first booking',
    discountType: 'percentage',
    discountValue: 20,
    maxDiscount: 1000,
    minAmount: 1500,
    usageLimit: 200,
    usedCount: 75,
    startDate: '2026-07-01',
    endDate: '2026-08-20',
    active: false
  }
])


// =====================================================
// FILTERED COUPONS
// =====================================================

const filteredCoupons = computed(() => {

  const keyword = search.value
    .toLowerCase()
    .trim()

  return coupons.value.filter(coupon => {

    const matchesSearch =
      !keyword ||
      coupon.code.toLowerCase().includes(keyword) ||
      coupon.description.toLowerCase().includes(keyword)


    const matchesStatus =
      statusFilter.value === 'all' ||
      (statusFilter.value === 'active' && coupon.active) ||
      (statusFilter.value === 'inactive' && !coupon.active)


    const matchesDiscount =
      discountFilter.value === 'all' ||
      coupon.discountType === discountFilter.value


    return (
      matchesSearch &&
      matchesStatus &&
      matchesDiscount
    )

  })

})


// =====================================================
// STATISTICS
// =====================================================

const activeCoupons = computed(() => {

  return coupons.value.filter(
    coupon => coupon.active
  ).length

})


const upcomingCoupons = computed(() => {

  const today = new Date()

  return coupons.value.filter(coupon => {

    return (
      new Date(coupon.startDate) > today
    )

  }).length

})


const expiredCoupons = computed(() => {

  const today = new Date()

  return coupons.value.filter(coupon => {

    return (
      new Date(coupon.endDate) < today
    )

  }).length

})


// =====================================================
// OPEN ADD DIALOG
// =====================================================

function openAddDialog() {

  isEdit.value = false

  form.value = defaultForm()

  const today = new Date()

  const nextMonth = new Date()

  nextMonth.setMonth(
    nextMonth.getMonth() + 1
  )

  form.value.startDate =
    formatInputDate(today)

  form.value.endDate =
    formatInputDate(nextMonth)

  couponDialog.value = true
}


// =====================================================
// OPEN EDIT DIALOG
// =====================================================

function openEditDialog(coupon) {

  isEdit.value = true

  form.value = {
    ...coupon
  }

  couponDialog.value = true
}


// =====================================================
// SAVE COUPON
// =====================================================

async function saveCoupon() {

  if (!form.value.code.trim()) {

    $q.notify({
      type: 'negative',
      message: 'Coupon code is required'
    })

    return
  }


  if (!form.value.discountValue) {

    $q.notify({
      type: 'negative',
      message: 'Discount value is required'
    })

    return
  }


  if (!form.value.startDate || !form.value.endDate) {

    $q.notify({
      type: 'negative',
      message: 'Please select coupon validity dates'
    })

    return
  }


  if (
    new Date(form.value.endDate) <
    new Date(form.value.startDate)
  ) {

    $q.notify({
      type: 'negative',
      message: 'End date cannot be before start date'
    })

    return
  }


  saving.value = true

  try {

    /*
     * =================================================
     * API IMPLEMENTATION
     * =================================================
     *
     * Replace these URLs with your backend endpoints.
     *
     * POST:
     * /admin/coupons/create
     *
     * PUT:
     * /admin/coupons/update/:id
     *
     */

    if (isEdit.value) {

      // Example:
      // await axios.put(
      //   `/admin/coupons/update/${form.value.id}`,
      //   form.value
      // )

      const index = coupons.value.findIndex(
        item => item.id === form.value.id
      )

      if (index !== -1) {

        coupons.value[index] = {
          ...form.value,
          code: form.value.code
            .trim()
            .toUpperCase()
        }

      }

      $q.notify({
        type: 'positive',
        message: 'Coupon updated successfully'
      })

    } else {

      // Example:
      // const response = await axios.post(
      //   '/admin/coupons/create',
      //   form.value
      // )

      coupons.value.unshift({
        ...form.value,
        id: Date.now(),
        code: form.value.code
          .trim()
          .toUpperCase()
      })

      $q.notify({
        type: 'positive',
        message: 'Coupon created successfully'
      })

    }

    couponDialog.value = false

  } catch (error) {

    console.error(
      'Coupon Save Error:',
      error
    )

    $q.notify({
      type: 'negative',
      message:
        error?.response?.data?.message ||
        'Unable to save coupon'
    })

  } finally {

    saving.value = false

  }

}


// =====================================================
// DELETE COUPON
// =====================================================

function deleteCoupon(coupon) {

  $q.dialog({
    title: 'Delete Coupon',
    message:
      `Are you sure you want to delete "${coupon.code}"?`,
    cancel: true,
    persistent: true
  }).onOk(async () => {

    try {

      /*
       * API:
       *
       * await axios.delete(
       *   `/admin/coupons/delete/${coupon.id}`
       * )
       */

      coupons.value =
        coupons.value.filter(
          item => item.id !== coupon.id
        )

      $q.notify({
        type: 'positive',
        message: 'Coupon deleted successfully'
      })

    } catch (error) {

      console.error(
        'Delete Coupon Error:',
        error
      )

      $q.notify({
        type: 'negative',
        message: 'Unable to delete coupon'
      })

    }

  })

}


// =====================================================
// TOGGLE COUPON
// =====================================================

async function toggleCoupon(coupon) {

  try {

    /*
     * API:
     *
     * await axios.patch(
     *   `/admin/coupons/status/${coupon.id}`,
     *   {
     *     active: coupon.active
     *   }
     * )
     */

    $q.notify({
      type: 'positive',
      message: coupon.active
        ? 'Coupon activated'
        : 'Coupon deactivated'
    })

  } catch (error) {

    coupon.active = !coupon.active

    $q.notify({
      type: 'negative',
      message: 'Unable to update coupon status'
    })

  }

}


// =====================================================
// RESET FILTERS
// =====================================================

function resetFilters() {

  search.value = ''
  statusFilter.value = 'all'
  discountFilter.value = 'all'

}


// =====================================================
// DATE FORMAT
// =====================================================

function formatDate(date) {

  if (!date) {
    return '-'
  }

  return new Date(date).toLocaleDateString(
    'en-IN',
    {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    }
  )

}


function formatInputDate(date) {

  const year = date.getFullYear()

  const month =
    String(date.getMonth() + 1)
      .padStart(2, '0')

  const day =
    String(date.getDate())
      .padStart(2, '0')

  return `${year}-${month}-${day}`

}


// =====================================================
// LOAD COUPONS
// =====================================================

async function loadCoupons() {

  loading.value = true

  try {

    /*
     * When your backend API is ready,
     * uncomment and change the endpoint.
     *
     * const response = await axios.get(
     *   '/admin/coupons'
     * )
     *
     * coupons.value = response.data.data
     */

  } catch (error) {

    console.error(
      'Load Coupons Error:',
      error
    )

    $q.notify({
      type: 'negative',
      message: 'Unable to load coupons'
    })

  } finally {

    loading.value = false

  }

}


onMounted(() => {

  loadCoupons()

})

</script>


<style scoped>

.coupons-page {
  background: #f5f7fb;
  min-height: 100%;
}


/* ===============================
   STAT CARD
================================ */

.stat-card {
  border-radius: 12px;
  border: 1px solid #e8eaf0;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.04);
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

.coupon-table-card {
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid #e8eaf0;
}


/* ===============================
   RESPONSIVE
================================ */

@media (max-width: 768px) {

  .coupons-page {
    padding: 12px !important;
  }

}

</style>
