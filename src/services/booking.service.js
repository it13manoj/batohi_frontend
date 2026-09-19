import api from '@/config/api'

// Helper function to normalize various backend booking statuses into display values
export const normalizeBookingStatus = status => {
  const normalized = String(status || 'pending')
    .trim()
    .toLowerCase()
  if (['accept', 'accepted', 'driver_accepted'].includes(normalized))
    return 'Accepted'
  if (['confirm', 'confirmed'].includes(normalized)) return 'Confirmed'
  if (
    ['start', 'started', 'in_progress', 'ongoing', 'on_trip'].includes(
      normalized
    )
  )
    return 'Started'
  if (['cancel', 'cancelled', 'canceled'].includes(normalized))
    return 'Cancelled'
  if (normalized === 'rejected') return 'Rejected'
  if (normalized === 'completed') return 'Completed'
  if (normalized === 'pending') return 'Pending'
  return normalized.charAt(0).toUpperCase() + normalized.slice(1)
}

// Fallback demo bookings for testing or offline dev
const demoBookings = {
  1: {
    id: 1,
    bookingNumber: 'BK-10001',
    vehicleId: 1,
    vehicleName: 'Toyota Innova Crysta',
    vehicleType: 'MPV',
    vehicleNumber: 'BR-01-AB-1234',
    passengers: 5,
    bookingDate: '2026-08-25',
    bookingTime: '09:00 AM',
    pickupLocation: 'Patna Airport',
    dropLocation: 'Muzaffarpur',
    distance: '72 km',
    duration: '2 hr 15 min',
    otp: '4821',
    returnTrip: false,
    returnDate: null,
    returnTime: null,
    customerName: 'Customer',
    mobile: '9876543210',
    email: 'customer@batohidriver.com',
    driverName: 'Ramesh Kumar',
    driverMobile: '9876501234',
    driverRating: 4.9,
    specialRequest: 'Please provide a clean vehicle.',
    vehicleFare: 2500,
    tax: 125,
    discount: 0,
    totalAmount: 2625,
    status: 'Confirmed',
    paymentStatus: 'Paid',
    createdAt: '2026-08-20 10:30:00',
    confirmedAt: '2026-08-20 10:45:00',
    paidAt: '2026-08-20 11:00:00',
    completedAt: null,
    cancelledAt: null
  },
  2: {
    id: 2,
    bookingNumber: 'BK-10002',
    vehicleId: 2,
    vehicleName: 'Mahindra Scorpio',
    vehicleType: 'SUV',
    vehicleNumber: 'BR-01-XY-5678',
    passengers: 4,
    bookingDate: '2026-08-28',
    bookingTime: '08:30 AM',
    pickupLocation: 'Patna Railway Station',
    dropLocation: 'Gaya',
    distance: '105 km',
    duration: '3 hr 10 min',
    otp: '9312',
    returnTrip: false,
    returnDate: null,
    returnTime: null,
    customerName: 'Customer',
    mobile: '9876543210',
    email: 'customer@batohidriver.com',
    driverName: 'Amit Singh',
    driverMobile: '9876505678',
    driverRating: 4.8,
    specialRequest: '',
    vehicleFare: 2800,
    tax: 140,
    discount: 0,
    totalAmount: 2940,
    status: 'Pending',
    paymentStatus: 'Pending',
    createdAt: '2026-08-20 14:20:00',
    confirmedAt: null,
    paidAt: null,
    completedAt: null,
    cancelledAt: null
  },
  3: {
    id: 3,
    bookingNumber: 'BK-10003',
    vehicleId: 3,
    vehicleName: 'Maruti Ertiga',
    vehicleType: 'MPV',
    vehicleNumber: 'BR-06-CD-9012',
    passengers: 4,
    bookingDate: '2026-08-10',
    bookingTime: '10:00 AM',
    pickupLocation: 'Muzaffarpur',
    dropLocation: 'Patna',
    distance: '75 km',
    duration: '2 hr 20 min',
    otp: null,
    returnTrip: false,
    returnDate: null,
    returnTime: null,
    customerName: 'Customer',
    mobile: '9876543210',
    email: 'customer@batohidriver.com',
    driverName: 'Vikram Yadav',
    driverMobile: '9876509012',
    driverRating: 4.7,
    specialRequest: '',
    vehicleFare: 2000,
    tax: 100,
    discount: 0,
    totalAmount: 2100,
    status: 'Completed',
    paymentStatus: 'Paid',
    createdAt: '2026-08-05 10:00:00',
    confirmedAt: '2026-08-05 10:20:00',
    paidAt: '2026-08-05 10:30:00',
    completedAt: '2026-08-10 18:00:00',
    cancelledAt: null
  }
}

// Format API ride item into frontend booking schema
export const formatBooking = item => {
  if (!item) return null

  const driverUser = item.driver || {}
  const driverProfile = driverUser.driver || {}
  const vehicle = driverProfile.vehicle || item.vehicle || {}
  const rider = item.rider || {}

  const fareNum = parseFloat(item.fare || item.amount || 0) || 0
  const taxNum = Math.round(fareNum - fareNum / 1.05)
  const vehicleFare = Math.round(fareNum - taxNum)

  const createdDate = item.created_at ? item.created_at.split('T')[0] : ''
  const createdTime = item.created_at
    ? new Date(item.created_at).toLocaleTimeString('en-IN', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      })
    : ''

  const normalizedStatus = normalizeBookingStatus(item.status)
  const isPaid =
    ['Completed', 'Confirmed'].includes(normalizedStatus) ||
    item.payment_status === 'paid' ||
    item.paymentStatus === 'Paid'

  const driverFullName = driverProfile.first_name
    ? `${driverProfile.first_name} ${driverProfile.last_name || ''}`.trim()
    : driverUser.username || null

  const driverPhone =
    driverProfile.mobile_number ||
    driverProfile.mobile ||
    driverProfile.phone ||
    driverUser.mobile_no ||
    driverUser.mobile ||
    null

  return {
    id: item.id,
    bookingNumber:
      item.booking_number || item.bookingNumber || `BK-${10000 + item.id}`,
    vehicleId: vehicle.id || null,
    vehicleName: vehicle.vehicle_name || 'Standard Vehicle',
    vehicleType: vehicle.manufacturer || vehicle.model || 'Cab',
    vehicleNumber: vehicle.registration_number || vehicle.registration_no || '',
    seatingCapacity: vehicle.seating_capacity || 4,
    fuelType: vehicle.fuel_type || 'Petrol',
    passengers: vehicle.seating_capacity || 4,
    bookingDate: createdDate || new Date().toISOString().slice(0, 10),
    bookingTime: createdTime || '10:00 AM',
    pickupLocation:
      item.from || item.pickup_location || 'Pickup Location Unavailable',
    dropLocation: item.to || item.drop_location || 'Drop Location Unavailable',
    pickupLat: item.latitude_from ? Number(item.latitude_from) : null,
    pickupLng: item.longitude_from ? Number(item.longitude_from) : null,
    dropLat: item.latitude_to ? Number(item.latitude_to) : null,
    dropLng: item.longitude_to ? Number(item.longitude_to) : null,
    distance: item.distance || '0 km',
    duration: item.duration || 'N/A',
    otp: item.otp?.otp || null,
    returnTrip: Boolean(item.return_trip || item.returnTrip),
    returnDate: item.return_date || null,
    returnTime: item.return_time || null,
    customerName: rider.username || item.customerName || 'Customer',
    mobile: rider.mobile_no || item.mobile || '',
    email: rider.email || item.email || '',
    driverName: driverFullName,
    driverMobile: driverPhone,
    driverImage: driverProfile.profile_image || null,
    driverRating: driverProfile.rating || 4.8,
    specialRequest: item.special_request || item.specialRequest || '',
    vehicleFare: vehicleFare,
    tax: taxNum,
    discount: item.discount || 0,
    totalAmount: fareNum,
    status: normalizedStatus,
    paymentStatus: isPaid
      ? 'Paid'
      : normalizedStatus === 'Cancelled'
        ? 'Cancelled'
        : 'Pending',
    createdAt: item.created_at || new Date().toISOString(),
    confirmedAt:
      normalizedStatus !== 'Pending'
        ? item.updated_at || item.created_at
        : null,
    paidAt: isPaid ? item.updated_at || item.created_at : null,
    completedAt: normalizedStatus === 'Completed' ? item.updated_at : null,
    cancelledAt: normalizedStatus === 'Cancelled' ? item.updated_at : null,
    raw: item
  }
}

export const bookingService = {
  // Fetch a single booking by ID
  async getBookingById(id) {
    const bookingId = Number(id)
    if (!bookingId) return null

    // 1. First attempt: Dedicated booking status endpoint
    try {
      const res = await api.get(`/driver/bookings/status/${bookingId}`)
      if (res.data?.success && res.data?.data) {
        return formatBooking(res.data.data)
      }
    } catch (err) {
      console.warn(
        'Status endpoint not matched, falling back to all rides:',
        err?.message
      )
    }

    // 2. Second attempt: Find in customer's all rides
    try {
      const res = await api.get('/driver/find/all/ride')
      let rides = res.data?.data || res.data || []
      if (!Array.isArray(rides) && typeof rides === 'object') {
        rides = [rides]
      }

      const match = rides.find(r => Number(r.id) === bookingId)
      if (match) {
        return formatBooking(match)
      }
    } catch (err) {
      console.warn('Could not fetch from /driver/find/all/ride:', err?.message)
    }

    // 3. Fallback: Return sample demo booking if available
    if (demoBookings[bookingId]) {
      return { ...demoBookings[bookingId] }
    }

    return null
  },

  // Fetch all bookings for the authenticated customer
  async getMyBookings() {
    try {
      const response = await api.get('/driver/find/all/ride')
      let data = response.data?.data || response.data || []
      if (!Array.isArray(data) && typeof data === 'object') {
        data = [data]
      }

      if (Array.isArray(data) && data.length > 0) {
        return data.map(formatBooking)
      }
    } catch (err) {
      console.error('Error in getMyBookings:', err)
    }

    // Fallback to demo items if API returned empty or errored
    return Object.values(demoBookings)
  },

  // Cancel an active booking
  async cancelBooking(bookingId) {
    try {
      const res = await api.put(`/driver/cancel/${bookingId}`)
      return res.data
    } catch (err) {
      console.error('Cancel booking error:', err)
      throw err
    }
  }
}

export default bookingService
