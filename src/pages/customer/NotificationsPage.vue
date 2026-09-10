<template>
  <q-page class="notifications-page">

    <!-- ================= HEADER ================= -->
    <div class="page-header">

      <div>
        <div class="page-title">
          Notifications
        </div>

        <div class="page-subtitle">
          Stay updated with your bookings, payments and account activity
        </div>
      </div>

      <div class="header-actions">

        <q-btn
          flat
          color="primary"
          icon="done_all"
          label="Mark all as read"
          @click="markAllAsRead"
        />

        <q-btn
          flat
          color="primary"
          icon="arrow_back"
          label="Back to Dashboard"
          @click="goBack"
        />

      </div>

    </div>


    <!-- ================= NOTIFICATION CONTENT ================= -->
    <div class="notifications-container">

      <!-- ================= SUMMARY ================= -->
      <div class="summary-grid">

        <!-- Total -->
        <q-card class="summary-card">

          <q-card-section class="summary-content">

            <div class="summary-icon total-icon">
              <q-icon
                name="notifications"
                size="28px"
              />
            </div>

            <div>
              <div class="summary-number">
                {{ notifications.length }}
              </div>

              <div class="summary-label">
                Total Notifications
              </div>
            </div>

          </q-card-section>

        </q-card>


        <!-- Unread -->
        <q-card class="summary-card">

          <q-card-section class="summary-content">

            <div class="summary-icon unread-icon">
              <q-icon
                name="mark_email_unread"
                size="28px"
              />
            </div>

            <div>
              <div class="summary-number">
                {{ unreadCount }}
              </div>

              <div class="summary-label">
                Unread
              </div>
            </div>

          </q-card-section>

        </q-card>


        <!-- Booking -->
        <q-card class="summary-card">

          <q-card-section class="summary-content">

            <div class="summary-icon booking-icon">
              <q-icon
                name="directions_car"
                size="28px"
              />
            </div>

            <div>
              <div class="summary-number">
                {{ bookingNotificationCount }}
              </div>

              <div class="summary-label">
                Booking Updates
              </div>
            </div>

          </q-card-section>

        </q-card>


        <!-- Payment -->
        <q-card class="summary-card">

          <q-card-section class="summary-content">

            <div class="summary-icon payment-icon">
              <q-icon
                name="payments"
                size="28px"
              />
            </div>

            <div>
              <div class="summary-number">
                {{ paymentNotificationCount }}
              </div>

              <div class="summary-label">
                Payment Updates
              </div>
            </div>

          </q-card-section>

        </q-card>

      </div>


      <!-- ================= FILTER BAR ================= -->
      <q-card class="filter-card">

        <q-card-section class="filter-section">

          <!-- Search -->
          <q-input
            v-model="search"
            outlined
            dense
            clearable
            placeholder="Search notifications..."
            class="notification-search"
          >
            <template #prepend>
              <q-icon name="search" />
            </template>
          </q-input>


          <!-- Filter -->
          <q-select
            v-model="selectedFilter"
            outlined
            dense
            emit-value
            map-options
            :options="filterOptions"
            label="Filter"
            class="notification-filter"
          />


          <!-- Delete Read -->
          <q-btn
            outline
            color="negative"
            icon="delete_sweep"
            label="Clear Read"
            @click="clearReadNotifications"
          />

        </q-card-section>

      </q-card>


      <!-- ================= NOTIFICATION LIST ================= -->
      <q-card class="notification-card">

        <q-card-section class="notification-list-header">

          <div>

            <div class="list-title">
              Recent Notifications
            </div>

            <div class="list-subtitle">
              {{ filteredNotifications.length }}
              notification(s)
            </div>

          </div>

          <q-btn
            flat
            round
            icon="refresh"
            color="primary"
            @click="loadNotifications"
          >
            <q-tooltip>
              Refresh Notifications
            </q-tooltip>
          </q-btn>

        </q-card-section>


        <q-separator />


        <!-- ================= LIST ================= -->
        <q-list separator>

          <q-item
            v-for="notification in filteredNotifications"
            :key="notification.id"
            class="notification-item"
            :class="{
              'unread-notification': !notification.read
            }"
            clickable
            @click="openNotification(notification)"
          >

            <!-- Icon -->
            <q-item-section avatar>

              <div
                class="notification-icon"
                :class="getNotificationClass(notification.type)"
              >

                <q-icon
                  :name="getNotificationIcon(notification.type)"
                  size="24px"
                />

              </div>

            </q-item-section>


            <!-- Content -->
            <q-item-section>

              <q-item-label class="notification-title">

                {{ notification.title }}

                <q-badge
                  v-if="!notification.read"
                  color="primary"
                  rounded
                  label="New"
                  class="q-ml-sm"
                />

              </q-item-label>


              <q-item-label
                caption
                class="notification-message"
              >
                {{ notification.message }}
              </q-item-label>


              <q-item-label
                caption
                class="notification-time"
              >

                <q-icon
                  name="schedule"
                  size="14px"
                  class="q-mr-xs"
                />

                {{ notification.time }}

              </q-item-label>

            </q-item-section>


            <!-- Action -->
            <q-item-section side>

              <div class="notification-actions">

                <q-btn
                  flat
                  round
                  dense
                  :icon="
                    notification.read
                      ? 'mark_email_unread'
                      : 'mark_email_read'
                  "
                  color="primary"
                  @click.stop="
                    toggleReadStatus(notification)
                  "
                >

                  <q-tooltip>
                    {{
                      notification.read
                        ? 'Mark as unread'
                        : 'Mark as read'
                    }}
                  </q-tooltip>

                </q-btn>


                <q-btn
                  flat
                  round
                  dense
                  icon="more_vert"
                  color="grey-7"
                >

                  <q-menu>

                    <q-list
                      style="min-width: 160px"
                    >

                      <q-item
                        clickable
                        v-close-popup
                        @click="
                          toggleReadStatus(notification)
                        "
                      >

                        <q-item-section avatar>
                          <q-icon
                            :name="
                              notification.read
                                ? 'mark_email_unread'
                                : 'mark_email_read'
                            "
                          />
                        </q-item-section>

                        <q-item-section>
                          {{
                            notification.read
                              ? 'Mark unread'
                              : 'Mark as read'
                          }}
                        </q-item-section>

                      </q-item>


                      <q-item
                        clickable
                        v-close-popup
                        @click="
                          deleteNotification(notification.id)
                        "
                      >

                        <q-item-section avatar>
                          <q-icon
                            name="delete"
                            color="negative"
                          />
                        </q-item-section>

                        <q-item-section>
                          Delete
                        </q-item-section>

                      </q-item>

                    </q-list>

                  </q-menu>

                </q-btn>

              </div>

            </q-item-section>

          </q-item>

        </q-list>


        <!-- ================= EMPTY STATE ================= -->
        <div
          v-if="filteredNotifications.length === 0"
          class="empty-state"
        >

          <q-icon
            name="notifications_none"
            size="80px"
            color="grey-5"
          />

          <div class="empty-title">
            No Notifications
          </div>

          <div class="empty-description">
            You don't have any notifications matching your search.
          </div>

          <q-btn
            flat
            color="primary"
            label="Clear Filters"
            icon="filter_alt_off"
            @click="clearFilters"
          />

        </div>

      </q-card>

    </div>


    <!-- ================= NOTIFICATION DETAIL DIALOG ================= -->
    <q-dialog v-model="detailDialog">

      <q-card class="notification-dialog">

        <q-card-section class="dialog-header">

          <div class="dialog-icon">
            <q-icon
              :name="
                selectedNotification
                  ? getNotificationIcon(
                      selectedNotification.type
                    )
                  : 'notifications'
              "
              size="28px"
            />
          </div>

          <div>

            <div class="dialog-title">
              {{ selectedNotification?.title }}
            </div>

            <div class="dialog-time">
              {{ selectedNotification?.time }}
            </div>

          </div>

        </q-card-section>


        <q-separator />


        <q-card-section>

          <div class="dialog-message">
            {{ selectedNotification?.message }}
          </div>


          <div
            v-if="selectedNotification?.bookingId"
            class="booking-reference"
          >

            <q-icon
              name="confirmation_number"
              color="primary"
            />

            <span>
              Booking ID:
              <strong>
                #{{ selectedNotification.bookingId }}
              </strong>
            </span>

          </div>

        </q-card-section>


        <q-card-actions align="right">

          <q-btn
            flat
            color="primary"
            label="Close"
            v-close-popup
          />

          <q-btn
            v-if="selectedNotification?.bookingId"
            color="primary"
            label="View Booking"
            icon="open_in_new"
            @click="viewBooking"
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
  useRouter
} from 'vue-router'

import {
  Notify,
  Dialog
} from 'quasar'


const router = useRouter()


// =====================================================
// NOTIFICATIONS
// =====================================================

const notifications = ref([

  {
    id: 1,
    type: 'booking',
    title: 'Booking Confirmed',
    message:
      'Your booking #BD1001 has been successfully confirmed.',
    time: '10 minutes ago',
    read: false,
    bookingId: 'BD1001'
  },

  {
    id: 2,
    type: 'payment',
    title: 'Payment Successful',
    message:
      'Your payment of ₹5,500 has been successfully received.',
    time: '1 hour ago',
    read: false,
    bookingId: 'BD1001'
  },

  {
    id: 3,
    type: 'driver',
    title: 'Driver Assigned',
    message:
      'A driver has been assigned to your upcoming booking.',
    time: '3 hours ago',
    read: true,
    bookingId: 'BD1001'
  },

  {
    id: 4,
    type: 'booking',
    title: 'Booking Reminder',
    message:
      'Your trip is scheduled for tomorrow at 10:00 AM.',
    time: 'Yesterday',
    read: true,
    bookingId: 'BD1000'
  },

  {
    id: 5,
    type: 'system',
    title: 'Profile Updated',
    message:
      'Your profile information was successfully updated.',
    time: '2 days ago',
    read: true
  },

  {
    id: 6,
    type: 'payment',
    title: 'Payment Reminder',
    message:
      'Please complete the pending payment for your booking.',
    time: '3 days ago',
    read: false,
    bookingId: 'BD0998'
  },

  {
    id: 7,
    type: 'offer',
    title: 'Special Offer',
    message:
      'Get exclusive discounts on your next booking.',
    time: '5 days ago',
    read: true
  }

])


// =====================================================
// SEARCH & FILTER
// =====================================================

const search = ref('')

const selectedFilter = ref('all')


const filterOptions = [

  {
    label: 'All Notifications',
    value: 'all'
  },

  {
    label: 'Unread',
    value: 'unread'
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
    label: 'Driver',
    value: 'driver'
  },

  {
    label: 'System',
    value: 'system'
  },

  {
    label: 'Offers',
    value: 'offer'
  }

]


// =====================================================
// COMPUTED
// =====================================================

const unreadCount = computed(() => {

  return notifications.value.filter(
    notification => !notification.read
  ).length

})


const bookingNotificationCount = computed(() => {

  return notifications.value.filter(
    notification =>
      notification.type === 'booking'
  ).length

})


const paymentNotificationCount = computed(() => {

  return notifications.value.filter(
    notification =>
      notification.type === 'payment'
  ).length

})


const filteredNotifications = computed(() => {

  let result = [...notifications.value]


  // Filter
  if (selectedFilter.value === 'unread') {

    result = result.filter(
      notification => !notification.read
    )

  } else if (
    selectedFilter.value !== 'all'
  ) {

    result = result.filter(
      notification =>
        notification.type === selectedFilter.value
    )

  }


  // Search
  if (search.value.trim()) {

    const keyword =
      search.value.toLowerCase().trim()

    result = result.filter(notification => {

      return (

        notification.title
          .toLowerCase()
          .includes(keyword)

        ||

        notification.message
          .toLowerCase()
          .includes(keyword)

      )

    })

  }


  return result

})


// =====================================================
// NOTIFICATION ICON
// =====================================================

const getNotificationIcon = (type) => {

  const icons = {

    booking: 'directions_car',

    payment: 'payments',

    driver: 'person_pin_circle',

    system: 'settings',

    offer: 'local_offer'

  }

  return icons[type] || 'notifications'

}


// =====================================================
// NOTIFICATION CSS CLASS
// =====================================================

const getNotificationClass = (type) => {

  return `notification-${type}`

}


// =====================================================
// OPEN NOTIFICATION
// =====================================================

const selectedNotification = ref(null)

const detailDialog = ref(false)


const openNotification = (notification) => {

  selectedNotification.value =
    notification


  notification.read = true

  detailDialog.value = true

}


// =====================================================
// TOGGLE READ STATUS
// =====================================================

const toggleReadStatus = (notification) => {

  notification.read = !notification.read

  Notify.create({

    type: 'positive',

    message: notification.read
      ? 'Notification marked as read'
      : 'Notification marked as unread',

    position: 'top-right'

  })

}


// =====================================================
// MARK ALL READ
// =====================================================

const markAllAsRead = () => {

  notifications.value.forEach(
    notification => {
      notification.read = true
    }
  )

  Notify.create({

    type: 'positive',

    message:
      'All notifications marked as read',

    position: 'top-right'

  })

}


// =====================================================
// DELETE NOTIFICATION
// =====================================================

const deleteNotification = (id) => {

  notifications.value =
    notifications.value.filter(
      notification =>
        notification.id !== id
    )


  Notify.create({

    type: 'positive',

    message: 'Notification deleted',

    position: 'top-right'

  })

}


// =====================================================
// CLEAR READ NOTIFICATIONS
// =====================================================

const clearReadNotifications = () => {

  const readCount =
    notifications.value.filter(
      notification => notification.read
    ).length


  if (readCount === 0) {

    Notify.create({

      type: 'info',

      message:
        'There are no read notifications to clear'

    })

    return

  }


  Dialog.create({

    title: 'Clear Read Notifications',

    message:
      'Are you sure you want to delete all read notifications?',

    cancel: true,

    persistent: true

  }).onOk(() => {

    notifications.value =
      notifications.value.filter(
        notification =>
          !notification.read
      )


    Notify.create({

      type: 'positive',

      message:
        'Read notifications cleared'

    })

  })

}


// =====================================================
// VIEW BOOKING
// =====================================================

const viewBooking = () => {

  if (
    !selectedNotification.value?.bookingId
  ) {
    return
  }


  detailDialog.value = false


  router.push({

    name: 'customer-booking-details',

    query: {

      bookingId:
        selectedNotification.value
          .bookingId

    }

  })

}


// =====================================================
// CLEAR FILTERS
// =====================================================

const clearFilters = () => {

  search.value = ''

  selectedFilter.value = 'all'

}


// =====================================================
// REFRESH
// =====================================================

const loadNotifications = async () => {

  /*
    API CALL WILL COME HERE

    Example:

    const response = await axios.get(
      `${BASE_URL}/notifications`,
      {
        headers: {
          Authorization:
            `Bearer ${token}`
        }
      }
    )

    notifications.value =
      response.data.data
  */


  Notify.create({

    type: 'positive',

    message:
      'Notifications refreshed',

    position: 'top-right'

  })

}


// =====================================================
// BACK TO DASHBOARD
// =====================================================

const goBack = () => {

  router.push('/customer/dashboard')

}


// =====================================================
// LOAD ON PAGE
// =====================================================

onMounted(() => {

  loadNotifications()

})

</script>


<style scoped>

/* =====================================================
   PAGE
===================================================== */

.notifications-page {
  min-height: 100vh;

  background: #f5f7fb;

  padding: 25px;
}


/* =====================================================
   HEADER
===================================================== */

.page-header {
  display: flex;

  align-items: center;

  justify-content: space-between;

  gap: 20px;

  margin-bottom: 25px;
}


.page-title {
  font-size: 28px;

  font-weight: 700;

  color: #1f2937;
}


.page-subtitle {
  margin-top: 5px;

  font-size: 14px;

  color: #6b7280;
}


.header-actions {
  display: flex;

  align-items: center;

  gap: 5px;
}


/* =====================================================
   CONTAINER
===================================================== */

.notifications-container {
  max-width: 1150px;

  margin: 0 auto;
}


/* =====================================================
   SUMMARY
===================================================== */

.summary-grid {
  display: grid;

  grid-template-columns:
    repeat(4, 1fr);

  gap: 18px;

  margin-bottom: 20px;
}


.summary-card {
  border-radius: 14px;

  box-shadow:
    0 5px 20px
    rgba(0, 0, 0, 0.05);
}


.summary-content {
  display: flex;

  align-items: center;

  gap: 15px;
}


.summary-icon {
  width: 55px;

  height: 55px;

  border-radius: 14px;

  display: flex;

  align-items: center;

  justify-content: center;
}


.total-icon {
  background: #eaf2ff;

  color: #1976d2;
}


.unread-icon {
  background: #fff0f0;

  color: #e53935;
}


.booking-icon {
  background: #eafaf1;

  color: #21a366;
}


.payment-icon {
  background: #fff6e5;

  color: #f57c00;
}


.summary-number {
  font-size: 24px;

  font-weight: 700;

  color: #1f2937;
}


.summary-label {
  color: #7b8190;

  font-size: 12px;

  margin-top: 2px;
}


/* =====================================================
   FILTER
===================================================== */

.filter-card {
  border-radius: 14px;

  margin-bottom: 20px;

  box-shadow:
    0 5px 20px
    rgba(0, 0, 0, 0.04);
}


.filter-section {
  display: flex;

  align-items: center;

  gap: 15px;
}


.notification-search {
  flex: 1;
}


.notification-filter {
  width: 200px;
}


/* =====================================================
   NOTIFICATION CARD
===================================================== */

.notification-card {
  border-radius: 16px;

  overflow: hidden;

  box-shadow:
    0 6px 25px
    rgba(0, 0, 0, 0.05);
}


.notification-list-header {
  display: flex;

  align-items: center;

  justify-content: space-between;
}


.list-title {
  font-size: 19px;

  font-weight: 650;

  color: #1f2937;
}


.list-subtitle {
  color: #8a91a0;

  font-size: 13px;

  margin-top: 3px;
}


/* =====================================================
   NOTIFICATION ITEM
===================================================== */

.notification-item {
  padding: 18px 20px;

  transition:
    background 0.2s ease;
}


.notification-item:hover {
  background: #f8faff;
}


.unread-notification {
  background: #f1f6ff;
}


.notification-icon {
  width: 48px;

  height: 48px;

  border-radius: 12px;

  display: flex;

  align-items: center;

  justify-content: center;
}


/* Notification Types */

.notification-booking {
  background: #eaf2ff;

  color: #1976d2;
}


.notification-payment {
  background: #fff5e6;

  color: #f57c00;
}


.notification-driver {
  background: #eafaf1;

  color: #21a366;
}


.notification-system {
  background: #f1f2f4;

  color: #667085;
}


.notification-offer {
  background: #fff0f7;

  color: #d81b60;
}


.notification-title {
  font-size: 15px;

  font-weight: 650;

  color: #1f2937;
}


.notification-message {
  font-size: 13px;

  color: #667085;

  margin-top: 5px;

  line-height: 1.5;
}


.notification-time {
  display: flex;

  align-items: center;

  color: #9aa1ad;

  font-size: 12px;

  margin-top: 7px;
}


.notification-actions {
  display: flex;

  align-items: center;
}


/* =====================================================
   EMPTY STATE
===================================================== */

.empty-state {
  padding: 70px 20px;

  text-align: center;
}


.empty-title {
  font-size: 20px;

  font-weight: 650;

  color: #374151;

  margin-top: 15px;
}


.empty-description {
  color: #8a91a0;

  font-size: 14px;

  margin: 7px 0 15px;
}


/* =====================================================
   DIALOG
===================================================== */

.notification-dialog {
  width: 500px;

  max-width: 95vw;

  border-radius: 16px;
}


.dialog-header {
  display: flex;

  align-items: center;

  gap: 15px;
}


.dialog-icon {
  width: 50px;

  height: 50px;

  border-radius: 12px;

  display: flex;

  align-items: center;

  justify-content: center;

  background: #eaf2ff;

  color: #1976d2;
}


.dialog-title {
  font-size: 18px;

  font-weight: 650;

  color: #1f2937;
}


.dialog-time {
  color: #8a91a0;

  font-size: 12px;

  margin-top: 3px;
}


.dialog-message {
  color: #4b5563;

  line-height: 1.7;

  font-size: 14px;
}


.booking-reference {
  display: flex;

  align-items: center;

  gap: 8px;

  background: #f5f8ff;

  border-radius: 10px;

  padding: 12px;

  margin-top: 18px;

  color: #374151;

  font-size: 13px;
}


/* =====================================================
   MOBILE
===================================================== */

@media (max-width: 900px) {

  .summary-grid {
    grid-template-columns:
      repeat(2, 1fr);
  }

}


@media (max-width: 700px) {

  .notifications-page {
    padding: 15px;
  }


  .page-header {
    flex-direction: column;

    align-items: flex-start;
  }


  .header-actions {
    width: 100%;

    flex-wrap: wrap;
  }


  .filter-section {
    flex-direction: column;

    align-items: stretch;
  }


  .notification-filter {
    width: 100%;
  }


  .summary-grid {
    grid-template-columns: 1fr;
  }


  .notification-item {
    padding: 15px;
  }

}


@media (max-width: 500px) {

  .notification-actions
  .q-btn:first-child {
    display: none;
  }


  .notification-title {
    font-size: 14px;
  }


  .notification-message {
    font-size: 12px;
  }

}

</style>
