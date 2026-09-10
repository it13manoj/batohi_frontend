<template>
  <q-page class="notification-page q-pa-md">

    <!-- =====================================================
         PAGE HEADER
    ====================================================== -->
    <div class="row items-center justify-between q-mb-lg">

      <div>
        <div class="text-h5 text-weight-bold">
          Notifications
        </div>

        <div class="text-grey-6 q-mt-xs">
          Stay updated with your trips, bookings and account activity
        </div>
      </div>


      <div class="row q-gutter-sm">

        <q-btn
          v-if="unreadCount > 0"
          outline
          color="primary"
          icon="done_all"
          label="Mark all as read"
          no-caps
          @click="markAllAsRead"
        />

        <q-btn
          flat
          round
          icon="refresh"
          color="primary"
          @click="loadNotifications"
        >
          <q-tooltip>
            Refresh
          </q-tooltip>
        </q-btn>

      </div>

    </div>


    <!-- =====================================================
         STAT CARDS
    ====================================================== -->
    <div class="row q-col-gutter-md q-mb-lg">

      <!-- TOTAL -->
      <div class="col-12 col-sm-4">

        <q-card class="stat-card">

          <q-card-section class="row items-center">

            <q-avatar
              color="blue-1"
              text-color="primary"
              icon="notifications"
              size="48px"
            />

            <div class="q-ml-md">

              <div class="text-caption text-grey-6">
                Total Notifications
              </div>

              <div class="text-h5 text-weight-bold">
                {{ notifications.length }}
              </div>

            </div>

          </q-card-section>

        </q-card>

      </div>


      <!-- UNREAD -->
      <div class="col-12 col-sm-4">

        <q-card class="stat-card">

          <q-card-section class="row items-center">

            <q-avatar
              color="red-1"
              text-color="negative"
              icon="mark_email_unread"
              size="48px"
            />

            <div class="q-ml-md">

              <div class="text-caption text-grey-6">
                Unread
              </div>

              <div class="text-h5 text-weight-bold">
                {{ unreadCount }}
              </div>

            </div>

          </q-card-section>

        </q-card>

      </div>


      <!-- READ -->
      <div class="col-12 col-sm-4">

        <q-card class="stat-card">

          <q-card-section class="row items-center">

            <q-avatar
              color="green-1"
              text-color="positive"
              icon="mark_email_read"
              size="48px"
            />

            <div class="q-ml-md">

              <div class="text-caption text-grey-6">
                Read
              </div>

              <div class="text-h5 text-weight-bold">
                {{ readCount }}
              </div>

            </div>

          </q-card-section>

        </q-card>

      </div>

    </div>


    <!-- =====================================================
         FILTER BAR
    ====================================================== -->
    <q-card class="filter-card q-mb-md">

      <q-card-section>

        <div class="row items-center q-col-gutter-md">

          <!-- SEARCH -->
          <div class="col-12 col-md-5">

            <q-input
              v-model="search"
              outlined
              dense
              clearable
              placeholder="Search notifications..."
            >
              <template #prepend>
                <q-icon name="search" />
              </template>
            </q-input>

          </div>


          <!-- FILTER -->
          <div class="col-12 col-sm-4 col-md-3">

            <q-select
              v-model="statusFilter"
              outlined
              dense
              emit-value
              map-options
              :options="statusOptions"
              label="Status"
            />

          </div>


          <!-- TYPE -->
          <div class="col-12 col-sm-4 col-md-3">

            <q-select
              v-model="typeFilter"
              outlined
              dense
              emit-value
              map-options
              :options="typeOptions"
              label="Notification Type"
            />

          </div>


          <!-- CLEAR -->
          <div class="col-12 col-sm-4 col-md-1">

            <q-btn
              flat
              round
              icon="filter_alt_off"
              color="grey-7"
              @click="clearFilters"
            >
              <q-tooltip>
                Clear Filters
              </q-tooltip>
            </q-btn>

          </div>

        </div>

      </q-card-section>

    </q-card>


    <!-- =====================================================
         NOTIFICATION LIST
    ====================================================== -->
    <q-card class="notification-card">

      <q-card-section
        v-if="loading"
        class="flex flex-center q-pa-xl"
      >

        <q-spinner
          color="primary"
          size="40px"
        />

      </q-card-section>


      <q-list
        v-else-if="filteredNotifications.length > 0"
        separator
      >

        <q-item
          v-for="notification in filteredNotifications"
          :key="notification.id"
          clickable
          class="notification-item"
          :class="{
            'unread-notification': !notification.read
          }"
          @click="openNotification(notification)"
        >

          <!-- ICON -->
          <q-item-section avatar>

            <q-avatar
              :color="getNotificationColor(notification.type)"
              :text-color="getNotificationTextColor(notification.type)"
              size="48px"
            >

              <q-icon
                :name="getNotificationIcon(notification.type)"
                size="24px"
              />

            </q-avatar>

          </q-item-section>


          <!-- CONTENT -->
          <q-item-section>

            <q-item-label
              class="notification-title"
              :class="{
                'text-weight-bold': !notification.read
              }"
            >

              {{ notification.title }}

              <q-badge
                v-if="!notification.read"
                color="negative"
                rounded
                class="q-ml-sm"
              >
                New
              </q-badge>

            </q-item-label>


            <q-item-label
              caption
              lines="2"
              class="notification-message q-mt-xs"
            >
              {{ notification.message }}
            </q-item-label>


            <div class="row items-center q-mt-sm">

              <span class="text-caption text-grey-6">
                <q-icon
                  name="schedule"
                  size="14px"
                  class="q-mr-xs"
                />
                {{ formatDate(notification.createdAt) }}
              </span>


              <q-separator
                vertical
                class="q-mx-sm"
              />


              <q-badge
                outline
                :color="getNotificationBadgeColor(notification.type)"
              >
                {{ getNotificationTypeLabel(notification.type) }}
              </q-badge>

            </div>

          </q-item-section>


          <!-- ACTIONS -->
          <q-item-section
            side
            class="notification-actions"
          >

            <q-btn
              flat
              round
              dense
              icon="more_vert"
              color="grey-7"
              @click.stop
            >

              <q-menu>

                <q-list style="min-width: 170px">

                  <!-- MARK READ -->
                  <q-item
                    v-if="!notification.read"
                    clickable
                    v-close-popup
                    @click="markAsRead(notification)"
                  >

                    <q-item-section avatar>
                      <q-icon
                        name="done"
                        color="positive"
                      />
                    </q-item-section>

                    <q-item-section>
                      Mark as read
                    </q-item-section>

                  </q-item>


                  <!-- MARK UNREAD -->
                  <q-item
                    v-else
                    clickable
                    v-close-popup
                    @click="markAsUnread(notification)"
                  >

                    <q-item-section avatar>
                      <q-icon
                        name="mark_email_unread"
                        color="primary"
                      />
                    </q-item-section>

                    <q-item-section>
                      Mark as unread
                    </q-item-section>

                  </q-item>


                  <!-- DELETE -->
                  <q-item
                    clickable
                    v-close-popup
                    @click="deleteNotification(notification)"
                  >

                    <q-item-section avatar>
                      <q-icon
                        name="delete_outline"
                        color="negative"
                      />
                    </q-item-section>

                    <q-item-section class="text-negative">
                      Delete
                    </q-item-section>

                  </q-item>

                </q-list>

              </q-menu>

            </q-btn>

          </q-item-section>

        </q-item>

      </q-list>


      <!-- =====================================================
           EMPTY STATE
      ====================================================== -->
      <div
        v-else
        class="empty-state"
      >

        <q-icon
          name="notifications_none"
          size="70px"
          color="grey-5"
        />

        <div class="text-h6 text-grey-7 q-mt-md">
          No notifications found
        </div>

        <div class="text-caption text-grey-5 q-mt-xs">
          You're all caught up!
        </div>

      </div>


      <!-- =====================================================
           PAGINATION
      ====================================================== -->
      <q-card-actions
        v-if="filteredNotifications.length > 0"
        align="center"
        class="q-pa-md"
      >

        <q-pagination
          v-model="page"
          :max="totalPages"
          direction-links
          boundary-links
          color="primary"
        />

      </q-card-actions>

    </q-card>


    <!-- =====================================================
         NOTIFICATION DETAILS DIALOG
    ====================================================== -->
    <q-dialog v-model="detailsDialog">

      <q-card class="notification-dialog">

        <q-card-section class="row items-center">

          <q-avatar
            :color="getNotificationColor(selectedNotification?.type)"
            :text-color="
              getNotificationTextColor(
                selectedNotification?.type
              )
            "
            size="50px"
          >

            <q-icon
              :name="
                getNotificationIcon(
                  selectedNotification?.type
                )
              "
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

        </q-card-section>


        <q-separator />


        <q-card-section>

          <div class="text-body1 text-grey-8">
            {{ selectedNotification?.message }}
          </div>

        </q-card-section>


        <q-card-actions align="right">

          <q-btn
            flat
            label="Close"
            color="grey-7"
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


/* =========================================================
   QUASAR
========================================================= */

const $q = useQuasar()


/* =========================================================
   STATE
========================================================= */

const loading = ref(false)

const search = ref('')

const statusFilter = ref('all')

const typeFilter = ref('all')

const page = ref(1)

const rowsPerPage = 8

const detailsDialog = ref(false)

const selectedNotification = ref(null)


/* =========================================================
   FILTER OPTIONS
========================================================= */

const statusOptions = [

  {
    label: 'All',
    value: 'all'
  },

  {
    label: 'Unread',
    value: 'unread'
  },

  {
    label: 'Read',
    value: 'read'
  }

]


const typeOptions = [

  {
    label: 'All Types',
    value: 'all'
  },

  {
    label: 'Trip',
    value: 'trip'
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
    label: 'Account',
    value: 'account'
  },

  {
    label: 'System',
    value: 'system'
  }

]


/* =========================================================
   NOTIFICATIONS
========================================================= */

const notifications = ref([

  {
    id: 1,
    title: 'New Trip Assigned',
    message:
      'A new trip has been assigned to you. Please check the trip details and accept the assignment.',
    type: 'trip',
    read: false,
    createdAt: new Date()
  },

  {
    id: 2,
    title: 'Trip Reminder',
    message:
      'Your upcoming trip is scheduled for today. Please be ready before the pickup time.',
    type: 'trip',
    read: false,
    createdAt: new Date(
      Date.now() - 60 * 60 * 1000
    )
  },

  {
    id: 3,
    title: 'Booking Confirmed',
    message:
      'The customer booking has been confirmed successfully.',
    type: 'booking',
    read: true,
    createdAt: new Date(
      Date.now() - 3 * 60 * 60 * 1000
    )
  },

  {
    id: 4,
    title: 'Payment Received',
    message:
      'Your payment for the completed trip has been processed successfully.',
    type: 'payment',
    read: true,
    createdAt: new Date(
      Date.now() - 24 * 60 * 60 * 1000
    )
  },

  {
    id: 5,
    title: 'Profile Verification',
    message:
      'Your driver profile has been successfully verified.',
    type: 'account',
    read: true,
    createdAt: new Date(
      Date.now() - 2 * 24 * 60 * 60 * 1000
    )
  },

  {
    id: 6,
    title: 'System Maintenance',
    message:
      'Scheduled system maintenance will take place tonight. Some services may be temporarily unavailable.',
    type: 'system',
    read: false,
    createdAt: new Date(
      Date.now() - 3 * 24 * 60 * 60 * 1000
    )
  }

])


/* =========================================================
   COUNTS
========================================================= */

const unreadCount = computed(() => {

  return notifications.value.filter(
    notification =>
      !notification.read
  ).length

})


const readCount = computed(() => {

  return notifications.value.filter(
    notification =>
      notification.read
  ).length

})


/* =========================================================
   FILTERED NOTIFICATIONS
========================================================= */

const filteredNotifications = computed(() => {

  let result =
    [...notifications.value]


  /* SEARCH */

  if (search.value) {

    const keyword =
      search.value.toLowerCase()

    result = result.filter(
      notification =>

        notification.title
          .toLowerCase()
          .includes(keyword) ||

        notification.message
          .toLowerCase()
          .includes(keyword)

    )

  }


  /* STATUS */

  if (
    statusFilter.value === 'unread'
  ) {

    result =
      result.filter(
        notification =>
          !notification.read
      )

  }


  if (
    statusFilter.value === 'read'
  ) {

    result =
      result.filter(
        notification =>
          notification.read
      )

  }


  /* TYPE */

  if (
    typeFilter.value !== 'all'
  ) {

    result =
      result.filter(
        notification =>
          notification.type ===
          typeFilter.value
      )

  }


  return result

})


/* =========================================================
   PAGINATION
========================================================= */

const totalPages = computed(() => {

  return Math.max(
    1,
    Math.ceil(
      filteredNotifications.value.length /
      rowsPerPage
    )
  )

})


/* =========================================================
   LOAD NOTIFICATIONS
========================================================= */

const loadNotifications = async () => {

  loading.value = true

  try {

    /*
     * Connect your API here.
     *
     * Example:
     *
     * const response =
     *   await api.get('/driver/notifications')
     *
     * notifications.value =
     *   response.data.data
     *
     */

    await new Promise(
      resolve =>
        setTimeout(resolve, 400)
    )

  } catch (error) {

    console.error(
      'Notification loading error:',
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


/* =========================================================
   MARK AS READ
========================================================= */

const markAsRead = notification => {

  notification.read = true

  $q.notify({

    type: 'positive',

    icon: 'done',

    message:
      'Notification marked as read'

  })

}


/* =========================================================
   MARK AS UNREAD
========================================================= */

const markAsUnread = notification => {

  notification.read = false

  $q.notify({

    type: 'info',

    icon: 'mark_email_unread',

    message:
      'Notification marked as unread'

  })

}


/* =========================================================
   MARK ALL AS READ
========================================================= */

const markAllAsRead = () => {

  notifications.value.forEach(
    notification => {

      notification.read = true

    }
  )

  $q.notify({

    type: 'positive',

    icon: 'done_all',

    message:
      'All notifications marked as read'

  })

}


/* =========================================================
   DELETE NOTIFICATION
========================================================= */

const deleteNotification = notification => {

  $q.dialog({

    title: 'Delete Notification',

    message:
      'Are you sure you want to delete this notification?',

    cancel: true,

    persistent: true

  }).onOk(() => {

    notifications.value =
      notifications.value.filter(
        item =>
          item.id !== notification.id
      )

    $q.notify({

      type: 'positive',

      message:
        'Notification deleted'

    })

  })

}


/* =========================================================
   OPEN NOTIFICATION
========================================================= */

const openNotification = notification => {

  selectedNotification.value =
    notification

  detailsDialog.value = true


  // Automatically mark unread notification as read
  if (!notification.read) {

    notification.read = true

  }

}


/* =========================================================
   CLEAR FILTERS
========================================================= */

const clearFilters = () => {

  search.value = ''

  statusFilter.value = 'all'

  typeFilter.value = 'all'

  page.value = 1

}


/* =========================================================
   NOTIFICATION ICON
========================================================= */

const getNotificationIcon = type => {

  const icons = {

    trip: 'route',

    booking: 'event_available',

    payment: 'payments',

    account: 'person',

    system: 'settings'

  }

  return icons[type] || 'notifications'

}


/* =========================================================
   NOTIFICATION COLOR
========================================================= */

const getNotificationColor = type => {

  const colors = {

    trip: 'blue-1',

    booking: 'green-1',

    payment: 'orange-1',

    account: 'purple-1',

    system: 'grey-2'

  }

  return colors[type] || 'blue-1'

}


/* =========================================================
   TEXT COLOR
========================================================= */

const getNotificationTextColor = type => {

  const colors = {

    trip: 'primary',

    booking: 'positive',

    payment: 'orange-9',

    account: 'purple-8',

    system: 'grey-8'

  }

  return colors[type] || 'primary'

}


/* =========================================================
   BADGE COLOR
========================================================= */

const getNotificationBadgeColor = type => {

  const colors = {

    trip: 'primary',

    booking: 'positive',

    payment: 'orange',

    account: 'purple',

    system: 'grey-7'

  }

  return colors[type] || 'primary'

}


/* =========================================================
   TYPE LABEL
========================================================= */

const getNotificationTypeLabel = type => {

  const labels = {

    trip: 'Trip',

    booking: 'Booking',

    payment: 'Payment',

    account: 'Account',

    system: 'System'

  }

  return labels[type] || 'Notification'

}


/* =========================================================
   DATE FORMAT
========================================================= */

const formatDate = date => {

  if (!date) {
    return ''
  }

  const notificationDate =
    new Date(date)

  const now =
    new Date()

  const diff =
    now.getTime() -
    notificationDate.getTime()

  const minutes =
    Math.floor(
      diff / (1000 * 60)
    )

  if (minutes < 1) {

    return 'Just now'

  }


  if (minutes < 60) {

    return `${minutes} min ago`

  }


  const hours =
    Math.floor(
      minutes / 60
    )

  if (hours < 24) {

    return `${hours} hr ago`

  }


  const days =
    Math.floor(
      hours / 24
    )

  if (days < 7) {

    return `${days} day${days > 1 ? 's' : ''} ago`

  }


  return notificationDate.toLocaleDateString(
    'en-IN',
    {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    }
  )

}


/* =========================================================
   ON MOUNTED
========================================================= */

onMounted(() => {

  loadNotifications()

})

</script>


<style scoped>

/* =========================================================
   PAGE
========================================================= */

.notification-page {
  background: #f5f7fb;
  min-height: 100vh;
}


/* =========================================================
   STAT CARDS
========================================================= */

.stat-card {
  border-radius: 14px;
  border: 1px solid #e5e7eb;
  box-shadow: none;
  background: #ffffff;
}


/* =========================================================
   FILTER CARD
========================================================= */

.filter-card {
  border-radius: 14px;
  border: 1px solid #e5e7eb;
  box-shadow: none;
}


/* =========================================================
   NOTIFICATION CARD
========================================================= */

.notification-card {
  border-radius: 14px;
  border: 1px solid #e5e7eb;
  box-shadow: none;
  overflow: hidden;
}


/* =========================================================
   NOTIFICATION ITEM
========================================================= */

.notification-item {
  min-height: 92px;
  padding: 16px 18px;
  transition: background 0.2s ease;
}


.notification-item:hover {
  background: #f8fafc;
}


.unread-notification {
  background: #f0f6ff;
}


.unread-notification:hover {
  background: #eaf2ff;
}


/* =========================================================
   TITLE
========================================================= */

.notification-title {
  font-size: 15px;
  color: #1f2937;
}


.notification-message {
  color: #6b7280;
  line-height: 1.5;
}


/* =========================================================
   EMPTY STATE
========================================================= */

.empty-state {
  min-height: 350px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}


/* =========================================================
   DIALOG
========================================================= */

.notification-dialog {
  width: 520px;
  max-width: 92vw;
  border-radius: 16px;
}


/* =========================================================
   RESPONSIVE
========================================================= */

@media (max-width: 599px) {

  .notification-page {
    padding: 12px !important;
  }


  .notification-item {
    padding: 13px 10px;
  }


  .notification-item
  .notification-actions {
    padding-left: 4px;
  }

}

</style>
