import api from '@/config/api'

// Status normalizer
export const normalizeDriverTripStatus = status => {
  const value = String(status || 'pending')
    .toLowerCase()
    .trim()
  if (['accept', 'accepted', 'driver_accepted', 'confirmed'].includes(value))
    return 'accepted'
  if (['start', 'started', 'in_progress', 'ongoing', 'on_trip'].includes(value))
    return 'started'
  if (['complete', 'completed'].includes(value)) return 'completed'
  if (['cancel', 'cancelled', 'canceled'].includes(value)) return 'cancelled'
  if (['reject', 'rejected'].includes(value)) return 'rejected'
  return value
}

// Format date helper
const formatTripDate = date => {
  if (!date) return ''
  const d = new Date(date)
  if (isNaN(d.getTime())) return String(date)
  return d.toISOString().slice(0, 10)
}

const formatTripTime = date => {
  if (!date) return ''
  const d = new Date(date)
  if (isNaN(d.getTime())) return '10:00 AM'
  return d.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })
}

const formatDateTime = date => {
  if (!date) return null
  const d = new Date(date)
  if (isNaN(d.getTime())) return String(date)
  return d.toLocaleString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

// Fallback demo trips
const demoDriverTrips = {
  1: {
    id: 1,
    bookingNumber: 'BK-1002',
    date: '2026-08-27',
    time: '01:00 PM',
    status: 'completed',
    pickup: 'Boring Road, Patna',
    pickupLandmark: 'Near P&M Mall',
    drop: 'Danapur Railway Station',
    dropLandmark: 'Main Gate, Danapur',
    pickupLat: 25.6154,
    pickupLng: 85.1235,
    dropLat: 25.6318,
    dropLng: 85.0425,
    distance: '24 KM',
    fare: 1200,
    platformFee: 120,
    driverEarnings: 1080,
    paymentMethod: 'UPI',
    paymentStatus: 'Paid',
    customer: {
      name: 'Amit Singh',
      phone: '+91 91234 56789',
      email: 'amit@example.com'
    },
    vehicle: {
      name: 'Toyota Etios',
      number: 'BR01CD5678',
      type: 'Sedan',
      model: 'Etios 2024',
      seats: '4 Seats',
      fuel: 'Petrol'
    },
    otp: null,
    timeline: {
      assigned: '27 Aug 2026, 10:30 AM',
      accepted: '27 Aug 2026, 10:45 AM',
      started: '27 Aug 2026, 12:45 PM',
      completed: '27 Aug 2026, 01:45 PM'
    }
  },
  2: {
    id: 2,
    bookingNumber: 'BK-1003',
    date: '2026-08-28',
    time: '03:30 PM',
    status: 'accepted',
    pickup: 'Patna Airport (Terminal 1)',
    pickupLandmark: 'Departure Gate 2',
    drop: 'Muzaffarpur Bypass',
    dropLandmark: 'Zero Mile Chowk',
    pickupLat: 25.5913,
    pickupLng: 85.088,
    dropLat: 26.1209,
    dropLng: 85.3647,
    distance: '72 KM',
    fare: 2400,
    platformFee: 240,
    driverEarnings: 2160,
    paymentMethod: 'Online',
    paymentStatus: 'Paid',
    customer: {
      name: 'Pooja Verma',
      phone: '+91 98765 43210',
      email: 'pooja@example.com'
    },
    vehicle: {
      name: 'Toyota Innova Crysta',
      number: 'BR01AB1234',
      type: 'MPV',
      model: 'Innova 2025',
      seats: '6 Seats',
      fuel: 'Diesel'
    },
    otp: '5812',
    timeline: {
      assigned: '28 Aug 2026, 02:30 PM',
      accepted: '28 Aug 2026, 02:40 PM',
      started: null,
      completed: null
    }
  }
}

// Map backend ride model into driver trip schema
export const formatDriverTrip = item => {
  if (!item) return null

  const rider = item.rider || item.customer || {}
  const driverUser = item.driver || {}
  const driverProfile = driverUser.driver || {}
  const vehicle = driverProfile.vehicle || item.vehicle || {}

  const fareNum = parseFloat(item.fare || item.amount || 0) || 0
  const platformFee = Math.round(fareNum * 0.1) // 10% platform fee
  const driverEarnings = fareNum - platformFee

  const normalizedStatus = normalizeDriverTripStatus(item.status)
  const isPaid =
    normalizedStatus === 'completed' ||
    item.payment_status === 'paid' ||
    item.paymentStatus === 'Paid'

  const createdDate = item.created_at ? formatTripDate(item.created_at) : ''
  const createdTime = item.created_at ? formatTripTime(item.created_at) : ''

  return {
    id: item.id,
    bookingNumber:
      item.booking_number || item.bookingNumber || `BK-${1000 + item.id}`,
    date: createdDate || formatTripDate(new Date()),
    time: createdTime || '10:00 AM',
    status: normalizedStatus,
    pickup:
      item.from || item.pickup_location || 'Pickup location not specified',
    pickupLandmark: item.from_landmark || item.pickup_landmark || '',
    drop: item.to || item.drop_location || 'Drop location not specified',
    dropLandmark: item.to_landmark || item.drop_landmark || '',
    pickupLat: item.latitude_from ? Number(item.latitude_from) : null,
    pickupLng: item.longitude_from ? Number(item.longitude_from) : null,
    dropLat: item.latitude_to ? Number(item.latitude_to) : null,
    dropLng: item.longitude_to ? Number(item.longitude_to) : null,
    distance: item.distance || '0 KM',
    fare: fareNum,
    platformFee: platformFee,
    driverEarnings: driverEarnings,
    paymentMethod: item.payment_method || (isPaid ? 'UPI / Online' : 'Pending'),
    paymentStatus: isPaid
      ? 'Paid'
      : normalizedStatus === 'cancelled'
        ? 'Cancelled'
        : 'Pending',
    customer: {
      name: rider.username || rider.name || 'Rider',
      phone: rider.mobile_no || rider.phone || 'N/A',
      email: rider.email || 'customer@batohidriver.com',
      avatar: rider.profile_image || null
    },
    vehicle: {
      name: vehicle.vehicle_name || 'Assigned Vehicle',
      number: vehicle.registration_number || vehicle.registration_no || 'N/A',
      type: vehicle.manufacturer || vehicle.type || 'Standard',
      model: vehicle.model || 'Standard',
      seats: `${vehicle.seating_capacity || 4} Seats`,
      fuel: vehicle.fuel_type || 'Petrol'
    },
    otp: item.otp?.otp || null,
    timeline: {
      assigned: formatDateTime(item.created_at) || 'Assigned',
      accepted:
        normalizedStatus !== 'pending'
          ? formatDateTime(item.updated_at || item.created_at)
          : null,
      started: ['started', 'completed'].includes(normalizedStatus)
        ? formatDateTime(item.updated_at || item.created_at)
        : null,
      completed:
        normalizedStatus === 'completed'
          ? formatDateTime(item.updated_at || item.created_at)
          : null,
      cancelled:
        normalizedStatus === 'cancelled'
          ? formatDateTime(item.updated_at || item.created_at)
          : null
    },
    raw: item
  }
}

export const driverService = {
  // Fetch single trip details
  async getTripDetails(tripId) {
    const id = Number(tripId)
    if (!id) return null

    // 1. Try dedicated booking status endpoint
    try {
      const res = await api.get(`/driver/bookings/status/${id}`)
      if (res.data?.success && res.data?.data) {
        return formatDriverTrip(res.data.data)
      }
    } catch (err) {
      console.warn('Booking status fetch warning:', err?.message)
    }

    // 2. Try find in all rides for driver
    try {
      const res = await api.get('/driver/find/all/ride')
      let rides = res.data?.data || res.data || []
      if (!Array.isArray(rides) && typeof rides === 'object') rides = [rides]

      const match = rides.find(r => Number(r.id) === id)
      if (match) {
        return formatDriverTrip(match)
      }
    } catch (err) {
      console.warn('All rides fetch warning:', err?.message)
    }

    // 3. Fallback to demo items if ID exists
    if (demoDriverTrips[id]) {
      return { ...demoDriverTrips[id] }
    }

    return null
  },

  // Accept a pending ride
  async acceptTrip(tripId) {
    const res = await api.put(`/driver/accept-ride/${tripId}`)
    return res.data
  },

  // Reject a pending ride
  async rejectTrip(tripId, reason = '') {
    const res = await api.put(`/driver/reject-ride/${tripId}`, { reason })
    return res.data
  },

  // Start an accepted trip by verifying OTP
  async startTrip(tripId, otp) {
    const res = await api.post('/driver/start/ride', {
      booking_id: Number(tripId),
      otp: String(otp).trim()
    })
    return res.data
  },

  // Complete an in-progress trip
  async completeTrip(tripId) {
    const res = await api.put(`/driver/complete-ride/${tripId}`, {
      booking_id: Number(tripId)
    })
    return res.data
  },

  // Cancel trip
  async cancelTrip(tripId, reason = '') {
    const res = await api.put(`/driver/cancel/${tripId}`, { reason })
    return res.data
  }
}

export default driverService
