<template>
  <q-page class="notifications-page q-pa-md">

    <!-- ================= HEADER ================= -->
    <div class="row items-center justify-between q-mb-lg">

      <div>
        <div class="text-h5 text-weight-bold">
          Notifications
        </div>

        <div class="text-grey-7">
          Manage and send notifications to customers, drivers and agents
        </div>
      </div>

      <q-btn
        color="primary"
        icon="add"
        label="Create Notification"
        unelevated
        @click="openCreateDialog"
      />

    </div>


    <!-- ================= STAT CARDS ================= -->
    <div class="row q-col-gutter-md q-mb-lg">

      <!-- TOTAL -->
      <div class="col-12 col-sm-6 col-md-3">

        <q-card class="stat-card">
          <q-card-section>

            <div class="row items-center">

              <q-avatar
                color="blue-1"
                text-color="primary"
                icon="notifications"
                size="48px"
              />

              <div class="q-ml-md">

                <div class="text-grey-7">
                  Total Notifications
                </div>

                <div class="text-h5 text-weight-bold">
                  {{ notifications.length }}
                </div>

              </div>

            </div>

          </q-card-section>
        </q-card>

      </div>


      <!-- SENT -->
      <div class="col-12 col-sm-6 col-md-3">

        <q-card class="stat-card">
          <q-card-section>

            <div class="row items-center">

              <q-avatar
                color="green-1"
                text-color="positive"
                icon="send"
                size="48px"
              />

              <div class="q-ml-md">

                <div class="text-grey-7">
                  Sent
                </div>

                <div class="text-h5 text-weight-bold">
                  {{ sentNotifications }}
                </div>

              </div>

            </div>

          </q-card-section>
        </q-card>

      </div>


      <!-- UNREAD -->
      <div class="col-12 col-sm-6 col-md-3">

        <q-card class="stat-card">
          <q-card-section>

            <div class="row items-center">

              <q-avatar
                color="orange-1"
                text-color="orange"
                icon="mark_email_unread"
                size="48px"
              />

              <div class="q-ml-md">

                <div class="text-grey-7">
                  Unread
                </div>

                <div class="text-h5 text-weight-bold">
                  {{ unreadNotifications }}
                </div>

              </div>

            </div>

          </q-card-section>
        </q-card>

      </div>


      <!-- SCHEDULED -->
      <div class="col-12 col-sm-6 col-md-3">

        <q-card class="stat-card">
          <q-card-section>

            <div class="row items-center">

              <q-avatar
                color="purple-1"
                text-color="purple"
                icon="schedule"
                size="48px"
              />

              <div class="q-ml-md">

                <div class="text-grey-7">
                  Scheduled
                </div>

                <div class="text-h5 text-weight-bold">
                  {{ scheduledNotifications }}
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
              clearable
              placeholder="Search notification..."
            >

              <template #prepend>
                <q-icon name="search" />
              </template>

            </q-input>

          </div>


          <!-- TYPE -->
          <div class="col-12 col-md-3">

            <q-select
              v-model="typeFilter"
              outlined
              dense
              label="Notification Type"
              :options="typeOptions"
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


    <!-- ================= NOTIFICATION TABLE ================= -->
    <q-card class="notification-table-card">

      <q-table
        :rows="filteredNotifications"
        :columns="columns"
        row-key="id"
        flat
        bordered
        :loading="loading"
        :pagination="pagination"
        no-data-label="No notifications found"
      >


        <!-- NOTIFICATION -->
        <template #body-cell-notification="props">

          <q-td :props="props">

            <div class="row items-center no-wrap">

              <q-avatar
                :color="getTypeColor(props.row.type)"
                text-color="white"
                size="42px"
              >

                <q-icon
                  :name="getTypeIcon(props.row.type)"
                />

              </q-avatar>


              <div class="q-ml-md">

                <div class="text-weight-bold">
                  {{ props.row.title }}
                </div>

                <div class="text-caption text-grey-6 notification-message">
                  {{ props.row.message }}
                </div>

              </div>

            </div>

          </q-td>

        </template>


        <!-- RECIPIENT -->
        <template #body-cell-recipient="props">

          <q-td :props="props">

            <q-badge
              outline
              color="primary"
              class="q-pa-sm"
            >
              {{ props.row.recipient }}
            </q-badge>

          </q-td>

        </template>


        <!-- TYPE -->
        <template #body-cell-type="props">

          <q-td :props="props">

            <q-badge
              :color="getTypeColor(props.row.type)"
              class="q-pa-sm"
            >

              {{ formatType(props.row.type) }}

            </q-badge>

          </q-td>

        </template>


        <!-- DATE -->
        <template #body-cell-date="props">

          <q-td :props="props">

            <div class="text-body2">
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
              @click="viewNotification(props.row)"
            >

              <q-tooltip>
                View
              </q-tooltip>

            </q-btn>


            <!-- SEND -->
            <q-btn
              v-if="props.row.status === 'draft'"
              flat
              round
              dense
              icon="send"
              color="positive"
              @click="sendNotification(props.row)"
            >

              <q-tooltip>
                Send Notification
              </q-tooltip>

            </q-btn>


            <!-- DELETE -->
            <q-btn
              flat
              round
              dense
              icon="delete"
              color="negative"
              @click="deleteNotification(props.row)"
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
    <!-- CREATE NOTIFICATION DIALOG -->
    <!-- ================================================= -->

    <q-dialog v-model="notificationDialog">

      <q-card
        style="width: 650px; max-width: 95vw;"
      >

        <!-- HEADER -->
        <q-card-section class="row items-center justify-between">

          <div class="text-h6 text-weight-bold">
            Create Notification
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

            <!-- TITLE -->
            <div class="col-12">

              <q-input
                v-model="form.title"
                outlined
                label="Notification Title *"
                maxlength="100"
                :rules="[
                  val => !!val || 'Title is required'
                ]"
              />

            </div>


            <!-- MESSAGE -->
            <div class="col-12">

              <q-input
                v-model="form.message"
                outlined
                type="textarea"
                label="Message *"
                rows="4"
                maxlength="500"
                counter
                :rules="[
                  val => !!val || 'Message is required'
                ]"
              />

            </div>


            <!-- RECIPIENT -->
            <div class="col-12 col-md-6">

              <q-select
                v-model="form.recipient"
                outlined
                label="Send To *"
                :options="recipientOptions"
                emit-value
                map-options
              />

            </div>


            <!-- TYPE -->
            <div class="col-12 col-md-6">

              <q-select
                v-model="form.type"
                outlined
                label="Notification Type"
                :options="notificationTypeOptions"
                emit-value
                map-options
              />

            </div>


            <!-- CHANNEL -->
            <div class="col-12">

              <div class="text-subtitle2 q-mb-sm">
                Notification Channel
              </div>

              <div class="row q-gutter-md">

                <q-checkbox
                  v-model="form.channels"
                  val="push"
                  label="Push Notification"
                />

                <q-checkbox
                  v-model="form.channels"
                  val="email"
                  label="Email"
                />

                <q-checkbox
                  v-model="form.channels"
                  val="sms"
                  label="SMS"
                />

              </div>

            </div>


            <!-- SCHEDULE -->
            <div class="col-12">

              <q-toggle
                v-model="form.schedule"
                label="Schedule Notification"
                color="primary"
              />

            </div>


            <!-- SCHEDULE DATE -->
            <div
              v-if="form.schedule"
              class="col-12 col-md-6"
            >

              <q-input
                v-model="form.scheduleDate"
                outlined
                label="Schedule Date"
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
                        v-model="form.scheduleDate"
                        mask="YYYY-MM-DD"
                      />

                    </q-popup-proxy>

                  </q-icon>

                </template>

              </q-input>

            </div>


            <!-- SCHEDULE TIME -->
            <div
              v-if="form.schedule"
              class="col-12 col-md-6"
            >

              <q-input
                v-model="form.scheduleTime"
                outlined
                label="Schedule Time"
                type="time"
              />

            </div>

          </div>

        </q-card-section>


        <q-separator />


        <!-- ACTIONS -->
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
            label="Create Notification"
            unelevated
            :loading="saving"
            @click="createNotification"
          />

        </q-card-actions>

      </q-card>

    </q-dialog>


    <!-- ================================================= -->
    <!-- VIEW NOTIFICATION DIALOG -->
    <!-- ================================================= -->

    <q-dialog v-model="viewDialog">

      <q-card
        style="width: 550px; max-width: 95vw;"
      >

        <q-card-section>

          <div class="row items-center">

            <q-avatar
              :color="getTypeColor(selectedNotification?.type)"
              text-color="white"
              size="50px"
            >

              <q-icon
                :name="getTypeIcon(selectedNotification?.type)"
              />

            </q-avatar>


            <div class="q-ml-md">

              <div class="text-h6 text-weight-bold">
                {{ selectedNotification?.title }}
              </div>

              <div class="text-caption text-grey-6">

                {{ formatDate(selectedNotification?.createdAt) }}

              </div>

            </div>

          </div>

        </q-card-section>


        <q-separator />


        <q-card-section>

          <div class="text-body1 q-mb-md">
            {{ selectedNotification?.message }}
          </div>


          <div class="row q-gutter-sm">

            <q-badge color="primary">
              {{ selectedNotification?.recipient }}
            </q-badge>

            <q-badge
              :color="getStatusColor(selectedNotification?.status)"
            >
              {{ formatStatus(selectedNotification?.status) }}
            </q-badge>

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

const notificationDialog = ref(false)
const viewDialog = ref(false)

const selectedNotification = ref(null)

const search = ref('')
const typeFilter = ref('all')
const statusFilter = ref('all')


// =====================================================
// FORM
// =====================================================

const defaultForm = () => ({

  title: '',

  message: '',

  recipient: 'all',

  type: 'general',

  channels: ['push'],

  schedule: false,

  scheduleDate: '',

  scheduleTime: ''

})


const form = ref(defaultForm())


// =====================================================
// OPTIONS
// =====================================================

const recipientOptions = [

  {
    label: 'All Users',
    value: 'all'
  },

  {
    label: 'Customers',
    value: 'customers'
  },

  {
    label: 'Drivers',
    value: 'drivers'
  },

  {
    label: 'Agents',
    value: 'agents'
  }

]


const notificationTypeOptions = [

  {
    label: 'General',
    value: 'general'
  },

  {
    label: 'Booking',
    value: 'booking'
  },

  {
    label: 'Payment',
    value: 'payment'
  },

  {
    label: 'Promotion',
    value: 'promotion'
  },

  {
    label: 'System',
    value: 'system'
  },

  {
    label: 'Alert',
    value: 'alert'
  }

]


const typeOptions = [

  {
    label: 'All Types',
    value: 'all'
  },

  ...notificationTypeOptions

]


const statusOptions = [

  {
    label: 'All Status',
    value: 'all'
  },

  {
    label: 'Sent',
    value: 'sent'
  },

  {
    label: 'Draft',
    value: 'draft'
  },

  {
    label: 'Scheduled',
    value: 'scheduled'
  },

  {
    label: 'Read',
    value: 'read'
  },

  {
    label: 'Unread',
    value: 'unread'
  }

]


// =====================================================
// TABLE COLUMNS
// =====================================================

const columns = [

  {
    name: 'notification',
    label: 'Notification',
    align: 'left'
  },

  {
    name: 'recipient',
    label: 'Recipient',
    align: 'left',
    field: 'recipient'
  },

  {
    name: 'type',
    label: 'Type',
    align: 'left',
    field: 'type'
  },

  {
    name: 'date',
    label: 'Date',
    align: 'left'
  },

  {
    name: 'status',
    label: 'Status',
    align: 'left',
    field: 'status'
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
// SAMPLE DATA
// =====================================================

const notifications = ref([

  {
    id: 1,

    title: 'Booking Confirmed',

    message:
      'Your BatohiDrive booking has been confirmed successfully.',

    recipient: 'customers',

    type: 'booking',

    status: 'sent',

    createdAt:
      '2026-08-25T10:30:00',

    channels: ['push']

  },

  {
    id: 2,

    title: 'New Booking Available',

    message:
      'A new booking is available in your service area.',

    recipient: 'drivers',

    type: 'booking',

    status: 'sent',

    createdAt:
      '2026-08-25T09:45:00',

    channels: ['push', 'sms']

  },

  {
    id: 3,

    title: 'Payment Successful',

    message:
      'Payment for your booking has been successfully received.',

    recipient: 'customers',

    type: 'payment',

    status: 'read',

    createdAt:
      '2026-08-24T17:20:00',

    channels: ['push', 'email']

  },

  {
    id: 4,

    title: 'Monsoon Special Offer',

    message:
      'Get up to 20% off on your next BatohiDrive booking.',

    recipient: 'all',

    type: 'promotion',

    status: 'scheduled',

    createdAt:
      '2026-08-24T12:00:00',

    channels: ['push', 'email']

  },

  {
    id: 5,

    title: 'System Maintenance',

    message:
      'Scheduled maintenance will be performed tonight.',

    recipient: 'all',

    type: 'system',

    status: 'draft',

    createdAt:
      '2026-08-23T15:00:00',

    channels: ['push']

  }

])


// =====================================================
// FILTERED DATA
// =====================================================

const filteredNotifications = computed(() => {

  const keyword =
    search.value
      .toLowerCase()
      .trim()

  return notifications.value.filter(item => {

    const matchesSearch =

      !keyword ||

      item.title
        .toLowerCase()
        .includes(keyword) ||

      item.message
        .toLowerCase()
        .includes(keyword)


    const matchesType =

      typeFilter.value === 'all' ||

      item.type === typeFilter.value


    const matchesStatus =

      statusFilter.value === 'all' ||

      item.status === statusFilter.value


    return (

      matchesSearch &&

      matchesType &&

      matchesStatus

    )

  })

})


// =====================================================
// STATISTICS
// =====================================================

const sentNotifications = computed(() => {

  return notifications.value.filter(
    item => item.status === 'sent'
  ).length

})


const unreadNotifications = computed(() => {

  return notifications.value.filter(
    item => item.status === 'unread'
  ).length

})


const scheduledNotifications = computed(() => {

  return notifications.value.filter(
    item => item.status === 'scheduled'
  ).length

})


// =====================================================
// CREATE DIALOG
// =====================================================

function openCreateDialog() {

  form.value = defaultForm()

  notificationDialog.value = true

}


// =====================================================
// CREATE NOTIFICATION
// =====================================================

async function createNotification() {

  if (!form.value.title.trim()) {

    $q.notify({

      type: 'negative',

      message:
        'Notification title is required'

    })

    return

  }


  if (!form.value.message.trim()) {

    $q.notify({

      type: 'negative',

      message:
        'Notification message is required'

    })

    return

  }


  if (!form.value.channels.length) {

    $q.notify({

      type: 'negative',

      message:
        'Select at least one notification channel'

    })

    return

  }


  saving.value = true


  try {

    /*
     * =================================================
     * BACKEND API
     * =================================================
     *
     * Replace with your actual endpoint.
     *
     * POST /admin/notifications/create
     *
     * Example:
     *
     * const response = await axios.post(
     *   '/admin/notifications/create',
     *   form.value
     * )
     */


    const status =

      form.value.schedule
        ? 'scheduled'
        : 'draft'


    notifications.value.unshift({

      id: Date.now(),

      title:
        form.value.title.trim(),

      message:
        form.value.message.trim(),

      recipient:
        form.value.recipient,

      type:
        form.value.type,

      status,

      createdAt:
        new Date().toISOString(),

      channels:
        [...form.value.channels]

    })


    $q.notify({

      type: 'positive',

      message:
        form.value.schedule
          ? 'Notification scheduled successfully'
          : 'Notification created successfully'

    })


    notificationDialog.value = false


  } catch (error) {

    console.error(
      'Create Notification Error:',
      error
    )


    $q.notify({

      type: 'negative',

      message:
        error?.response?.data?.message ||
        'Unable to create notification'

    })

  } finally {

    saving.value = false

  }

}


// =====================================================
// SEND NOTIFICATION
// =====================================================

function sendNotification(notification) {

  $q.dialog({

    title: 'Send Notification',

    message:
      `Send "${notification.title}" to ${formatRecipient(notification.recipient)}?`,

    cancel: true,

    persistent: true

  }).onOk(async () => {

    try {

      /*
       * API:
       *
       * await axios.post(
       *   `/admin/notifications/send/${notification.id}`
       * )
       */


      notification.status = 'sent'


      $q.notify({

        type: 'positive',

        message:
          'Notification sent successfully'

      })


    } catch (error) {

      console.error(
        'Send Notification Error:',
        error
      )


      $q.notify({

        type: 'negative',

        message:
          'Unable to send notification'

      })

    }

  })

}


// =====================================================
// VIEW NOTIFICATION
// =====================================================

function viewNotification(notification) {

  selectedNotification.value =
    notification

  viewDialog.value = true


  // Mark unread notification as read

  if (notification.status === 'unread') {

    notification.status = 'read'

  }

}


// =====================================================
// DELETE
// =====================================================

function deleteNotification(notification) {

  $q.dialog({

    title: 'Delete Notification',

    message:
      `Are you sure you want to delete "${notification.title}"?`,

    cancel: true,

    persistent: true

  }).onOk(async () => {

    try {

      /*
       * API:
       *
       * await axios.delete(
       *   `/admin/notifications/delete/${notification.id}`
       * )
       */


      notifications.value =
        notifications.value.filter(
          item =>
            item.id !== notification.id
        )


      $q.notify({

        type: 'positive',

        message:
          'Notification deleted successfully'

      })


    } catch (error) {

      console.error(
        'Delete Notification Error:',
        error
      )


      $q.notify({

        type: 'negative',

        message:
          'Unable to delete notification'

      })

    }

  })

}


// =====================================================
// RESET FILTER
// =====================================================

function resetFilters() {

  search.value = ''

  typeFilter.value = 'all'

  statusFilter.value = 'all'

}


// =====================================================
// TYPE ICON
// =====================================================

function getTypeIcon(type) {

  const icons = {

    general: 'notifications',

    booking: 'directions_car',

    payment: 'payments',

    promotion: 'local_offer',

    system: 'settings',

    alert: 'warning'

  }


  return icons[type] || 'notifications'

}


// =====================================================
// TYPE COLOR
// =====================================================

function getTypeColor(type) {

  const colors = {

    general: 'blue',

    booking: 'primary',

    payment: 'positive',

    promotion: 'purple',

    system: 'grey-8',

    alert: 'negative'

  }


  return colors[type] || 'primary'

}


// =====================================================
// STATUS COLOR
// =====================================================

function getStatusColor(status) {

  const colors = {

    sent: 'positive',

    draft: 'grey',

    scheduled: 'purple',

    read: 'blue',

    unread: 'orange'

  }


  return colors[status] || 'grey'

}


// =====================================================
// FORMAT TYPE
// =====================================================

function formatType(type) {

  if (!type) return '-'

  return type
    .charAt(0)
    .toUpperCase() +
    type.slice(1)

}


// =====================================================
// FORMAT STATUS
// =====================================================

function formatStatus(status) {

  if (!status) return '-'

  return status
    .charAt(0)
    .toUpperCase() +
    status.slice(1)

}


// =====================================================
// FORMAT RECIPIENT
// =====================================================

function formatRecipient(recipient) {

  const names = {

    all: 'All Users',

    customers: 'Customers',

    drivers: 'Drivers',

    agents: 'Agents'

  }


  return names[recipient] || recipient

}


// =====================================================
// DATE FORMAT
// =====================================================

function formatDate(date) {

  if (!date) return '-'

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

  if (!date) return ''

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
// LOAD NOTIFICATIONS
// =====================================================

async function loadNotifications() {

  loading.value = true


  try {

    /*
     * =================================================
     * API
     * =================================================
     *
     * const response = await axios.get(
     *   '/admin/notifications'
     * )
     *
     * notifications.value =
     *   response.data.data
     */


  } catch (error) {

    console.error(
      'Load Notifications Error:',
      error
    )


    $q.notify({

      type: 'negative',

      message:
        'Unable to load notifications'

    })

  } finally {

    loading.value = false

  }

}


// =====================================================
// ON MOUNT
// =====================================================

onMounted(() => {

  loadNotifications()

})

</script>


<style scoped>

.notifications-page {
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
   FILTER
================================ */

.filter-card {

  border-radius: 12px;

  border: 1px solid #e8eaf0;

}


/* ===============================
   TABLE
================================ */

.notification-table-card {

  border-radius: 12px;

  overflow: hidden;

  border: 1px solid #e8eaf0;

}


/* ===============================
   MESSAGE
================================ */

.notification-message {

  max-width: 420px;

  overflow: hidden;

  text-overflow: ellipsis;

  white-space: nowrap;

}


/* ===============================
   MOBILE
================================ */

@media (max-width: 768px) {

  .notifications-page {
    padding: 12px !important;
  }

  .notification-message {
    max-width: 200px;
  }

}

</style>
