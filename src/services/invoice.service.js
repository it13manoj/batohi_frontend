import { bookingService } from './booking.service'

// Fallback demo invoices
const demoInvoices = [
  {
    id: 1,
    invoiceNumber: 'INV-2026-0001',
    bookingNumber: 'BK-10001',
    bookingId: 1,
    bookingDate: '2026-08-25',
    invoiceDate: '2026-08-20',
    pickupLocation: 'Patna Airport',
    dropLocation: 'Muzaffarpur',
    distance: '72 km',
    vehicleName: 'Toyota Innova Crysta',
    vehicleType: 'MPV',
    vehicleNumber: 'BR-01-AB-1234',
    driverName: 'Ramesh Kumar',
    driverMobile: '9876501234',
    customerName: 'Customer',
    mobile: '9876543210',
    email: 'customer@batohidriver.com',
    vehicleFare: 2500,
    tax: 125,
    discount: 0,
    totalAmount: 2625,
    paymentStatus: 'Paid',
    paymentMethod: 'UPI / Online'
  },
  {
    id: 2,
    invoiceNumber: 'INV-2026-0002',
    bookingNumber: 'BK-10002',
    bookingId: 2,
    bookingDate: '2026-08-28',
    invoiceDate: '2026-08-20',
    pickupLocation: 'Patna Railway Station',
    dropLocation: 'Gaya',
    distance: '105 km',
    vehicleName: 'Mahindra Scorpio',
    vehicleType: 'SUV',
    vehicleNumber: 'BR-01-XY-5678',
    driverName: 'Amit Singh',
    driverMobile: '9876505678',
    customerName: 'Customer',
    mobile: '9876543210',
    email: 'customer@batohidriver.com',
    vehicleFare: 2800,
    tax: 140,
    discount: 0,
    totalAmount: 2940,
    paymentStatus: 'Pending',
    paymentMethod: 'Pending'
  },
  {
    id: 3,
    invoiceNumber: 'INV-2026-0003',
    bookingNumber: 'BK-10003',
    bookingId: 3,
    bookingDate: '2026-08-10',
    invoiceDate: '2026-08-05',
    pickupLocation: 'Muzaffarpur',
    dropLocation: 'Patna',
    distance: '75 km',
    vehicleName: 'Maruti Ertiga',
    vehicleType: 'MPV',
    vehicleNumber: 'BR-06-CD-9012',
    driverName: 'Vikram Yadav',
    driverMobile: '9876509012',
    customerName: 'Customer',
    mobile: '9876543210',
    email: 'customer@batohidriver.com',
    vehicleFare: 2000,
    tax: 100,
    discount: 0,
    totalAmount: 2100,
    paymentStatus: 'Paid',
    paymentMethod: 'Card / Online'
  }
]

// Convert number to Indian currency words
function numberToWords(num) {
  const a = [
    '',
    'One ',
    'Two ',
    'Three ',
    'Four ',
    'Five ',
    'Six ',
    'Seven ',
    'Eight ',
    'Nine ',
    'Ten ',
    'Eleven ',
    'Twelve ',
    'Thirteen ',
    'Fourteen ',
    'Fifteen ',
    'Sixteen ',
    'Seventeen ',
    'Eighteen ',
    'Nineteen '
  ]
  const b = [
    '',
    '',
    'Twenty',
    'Thirty',
    'Forty',
    'Fifty',
    'Sixty',
    'Seventy',
    'Eighty',
    'Ninety'
  ]

  const n = ('000000000' + Math.floor(num))
    .substr(-9)
    .match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/)
  if (!n) return ''

  let str = ''
  str +=
    Number(n[1]) !== 0
      ? (a[Number(n[1])] || b[n[1][0]] + ' ' + a[n[1][1]]) + 'Crore '
      : ''
  str +=
    Number(n[2]) !== 0
      ? (a[Number(n[2])] || b[n[2][0]] + ' ' + a[n[2][1]]) + 'Lakh '
      : ''
  str +=
    Number(n[3]) !== 0
      ? (a[Number(n[3])] || b[n[3][0]] + ' ' + a[n[3][1]]) + 'Thousand '
      : ''
  str +=
    Number(n[4]) !== 0
      ? (a[Number(n[4])] || b[n[4][0]] + ' ' + a[n[4][1]]) + 'Hundred '
      : ''
  str +=
    Number(n[5]) !== 0
      ? (str !== '' ? 'and ' : '') +
        (a[Number(n[5])] || b[n[5][0]] + ' ' + a[n[5][1]]) +
        'Rupees Only'
      : 'Rupees Only'

  return str.trim()
}

export const invoiceService = {
  // Map a booking object into an invoice representation
  mapBookingToInvoice(booking) {
    if (!booking) return null

    const year = new Date(booking.createdAt || Date.now()).getFullYear()
    const invoiceNum = `INV-${year}-${String(booking.id).padStart(4, '0')}`

    const fare = Number(booking.vehicleFare || booking.totalAmount || 0)
    const tax = Number(booking.tax || 0)
    const total = Number(booking.totalAmount || fare + tax)
    const cgst = Math.round(tax / 2)
    const sgst = tax - cgst

    return {
      id: booking.id,
      invoiceNumber: invoiceNum,
      bookingNumber: booking.bookingNumber,
      bookingId: booking.id,
      bookingDate: booking.bookingDate,
      bookingTime: booking.bookingTime,
      invoiceDate: booking.createdAt
        ? booking.createdAt.split('T')[0]
        : booking.bookingDate,
      pickupLocation: booking.pickupLocation,
      dropLocation: booking.dropLocation,
      distance: booking.distance || 'N/A',
      vehicleName: booking.vehicleName,
      vehicleType: booking.vehicleType,
      vehicleNumber: booking.vehicleNumber || 'N/A',
      driverName: booking.driverName || 'Assigned Driver',
      driverMobile: booking.driverMobile || 'N/A',
      customerName: booking.customerName || 'Customer',
      mobile: booking.mobile || 'N/A',
      email: booking.email || 'N/A',
      vehicleFare: fare,
      tax: tax,
      cgst: cgst,
      sgst: sgst,
      discount: Number(booking.discount || 0),
      totalAmount: total,
      paymentStatus: booking.paymentStatus || 'Pending',
      paymentMethod:
        booking.paymentStatus === 'Paid' ? 'Online / UPI' : 'Pending',
      status: booking.status
    }
  },

  // Fetch all invoices for customer
  async getInvoices() {
    try {
      const bookings = await bookingService.getMyBookings()
      if (Array.isArray(bookings) && bookings.length > 0) {
        return bookings.map(b => this.mapBookingToInvoice(b))
      }
    } catch (err) {
      console.warn('Error fetching dynamic invoices, using demo data:', err)
    }

    return demoInvoices
  },

  // Get single invoice by booking ID
  async getInvoiceByBookingId(bookingId) {
    const booking = await bookingService.getBookingById(bookingId)
    if (booking) {
      return this.mapBookingToInvoice(booking)
    }
    const match = demoInvoices.find(
      inv => Number(inv.bookingId) === Number(bookingId)
    )
    return match || null
  },

  // Generate clean, GST-compliant HTML Tax Invoice document
  generateInvoiceHtml(invoice) {
    if (!invoice) return ''

    const fare = Number(invoice.vehicleFare || 0)
    const tax = Number(invoice.tax || 0)
    const cgst = Number(invoice.cgst || Math.round(tax / 2))
    const sgst = Number(invoice.sgst || tax - cgst)
    const total = Number(invoice.totalAmount || fare + tax)
    const amountInWords = numberToWords(total)

    const isPaid = invoice.paymentStatus?.toLowerCase() === 'paid'

    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Tax Invoice - ${invoice.invoiceNumber}</title>
  <style>
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
    }
    body {
      background: #f8fafc;
      color: #1e293b;
      padding: 24px;
      font-size: 13px;
      line-height: 1.5;
    }
    .invoice-wrapper {
      max-width: 800px;
      margin: 0 auto;
      background: #ffffff;
      border: 1px solid #e2e8f0;
      border-radius: 12px;
      padding: 36px 40px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
    }
    .header-row {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      border-bottom: 2px solid #0284c7;
      padding-bottom: 20px;
      margin-bottom: 24px;
    }
    .brand-title {
      font-size: 26px;
      font-weight: 800;
      color: #0284c7;
      letter-spacing: -0.5px;
    }
    .brand-tagline {
      font-size: 12px;
      color: #64748b;
      margin-top: 2px;
    }
    .company-details {
      margin-top: 8px;
      font-size: 11px;
      color: #475569;
      line-height: 1.4;
    }
    .invoice-badge-box {
      text-align: right;
    }
    .invoice-title {
      font-size: 22px;
      font-weight: 800;
      color: #0f172a;
      letter-spacing: 0.5px;
    }
    .invoice-sub {
      font-size: 11px;
      color: #64748b;
      font-weight: 600;
      margin-bottom: 6px;
    }
    .status-stamp {
      display: inline-block;
      padding: 4px 12px;
      border-radius: 6px;
      font-size: 12px;
      font-weight: 700;
      letter-spacing: 0.5px;
      text-transform: uppercase;
      margin-top: 4px;
    }
    .status-paid {
      background: #ecfdf5;
      color: #059669;
      border: 1px solid #a7f3d0;
    }
    .status-pending {
      background: #fffbeb;
      color: #d97706;
      border: 1px solid #fde68a;
    }
    .status-cancelled {
      background: #fef2f2;
      color: #dc2626;
      border: 1px solid #fecaca;
    }

    .meta-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 16px;
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      padding: 14px 18px;
      margin-bottom: 24px;
    }
    .meta-item .label {
      font-size: 10px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      color: #64748b;
      font-weight: 600;
      margin-bottom: 2px;
    }
    .meta-item .val {
      font-size: 13px;
      font-weight: 700;
      color: #0f172a;
    }

    .parties-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 24px;
      margin-bottom: 24px;
    }
    .card-block {
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      padding: 16px;
      background: #ffffff;
    }
    .card-title {
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      color: #0284c7;
      margin-bottom: 10px;
      padding-bottom: 6px;
      border-bottom: 1px solid #f1f5f9;
    }
    .info-row {
      display: flex;
      justify-content: space-between;
      margin-bottom: 6px;
      font-size: 12px;
    }
    .info-row:last-child {
      margin-bottom: 0;
    }
    .info-row .info-lbl {
      color: #64748b;
    }
    .info-row .info-val {
      font-weight: 600;
      color: #1e293b;
      text-align: right;
    }

    .route-box {
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      padding: 14px 18px;
      margin-bottom: 24px;
      background: #fdfdfd;
    }
    .route-title {
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      color: #0284c7;
      margin-bottom: 10px;
    }
    .route-row {
      display: flex;
      align-items: center;
      gap: 12px;
      font-size: 12px;
      margin-bottom: 6px;
    }
    .route-badge-pickup {
      background: #10b981;
      color: #ffffff;
      font-size: 9px;
      font-weight: 700;
      padding: 2px 6px;
      border-radius: 4px;
    }
    .route-badge-drop {
      background: #ef4444;
      color: #ffffff;
      font-size: 9px;
      font-weight: 700;
      padding: 2px 6px;
      border-radius: 4px;
    }

    table.fare-table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 20px;
    }
    table.fare-table th {
      background: #f1f5f9;
      color: #334155;
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      padding: 10px 14px;
      text-align: left;
      border: 1px solid #cbd5e1;
    }
    table.fare-table td {
      padding: 10px 14px;
      font-size: 12px;
      border: 1px solid #e2e8f0;
      color: #1e293b;
    }
    table.fare-table tr.total-row td {
      background: #f8fafc;
      font-weight: 800;
      font-size: 14px;
      color: #0284c7;
    }
    .text-right {
      text-align: right !important;
    }

    .words-box {
      font-size: 11px;
      color: #475569;
      margin-bottom: 24px;
      padding: 10px 14px;
      background: #f8fafc;
      border-left: 3px solid #0284c7;
      border-radius: 0 4px 4px 0;
    }
    .words-box strong {
      color: #0f172a;
    }

    .footer-note {
      border-top: 1px dashed #cbd5e1;
      padding-top: 16px;
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      font-size: 11px;
      color: #64748b;
    }
    .signature-box {
      text-align: right;
    }
    .signature-box .sign-title {
      font-weight: 700;
      color: #0f172a;
      margin-top: 24px;
      border-top: 1px solid #cbd5e1;
      padding-top: 4px;
      display: inline-block;
      min-width: 140px;
      text-align: center;
    }

    @media print {
      body {
        background: #ffffff !important;
        padding: 0 !important;
      }
      .invoice-wrapper {
        border: none !important;
        box-shadow: none !important;
        padding: 0 !important;
        width: 100% !important;
        max-width: 100% !important;
      }
      @page {
        size: A4 portrait;
        margin: 14mm 12mm;
      }
    }
  </style>
</head>
<body>
  <div class="invoice-wrapper">
    <!-- Header -->
    <div class="header-row">
      <div>
        <div class="brand-title">BatohiDrive</div>
        <div class="brand-tagline">Official Ride Receipt & Tax Invoice</div>
        <div class="company-details">
          <strong>Batohi Technologies Pvt. Ltd.</strong><br />
          Patna, Bihar, India - 800001<br />
          GSTIN: 10AAACB1234F1Z5 | PAN: AAACB1234F<br />
          Support: support@batohidriver.com | +91 98765 43210
        </div>
      </div>
      <div class="invoice-badge-box">
        <div class="invoice-title">TAX INVOICE</div>
        <div class="invoice-sub">Original for Recipient</div>
        <div class="status-stamp ${isPaid ? 'status-paid' : 'status-pending'}">
          ${invoice.paymentStatus || 'Pending'}
        </div>
      </div>
    </div>

    <!-- Meta Grid -->
    <div class="meta-grid">
      <div class="meta-item">
        <div class="label">Invoice No</div>
        <div class="val">${invoice.invoiceNumber}</div>
      </div>
      <div class="meta-item">
        <div class="label">Invoice Date</div>
        <div class="val">${invoice.invoiceDate || invoice.bookingDate}</div>
      </div>
      <div class="meta-item">
        <div class="label">Booking Ref</div>
        <div class="val">${invoice.bookingNumber}</div>
      </div>
      <div class="meta-item">
        <div class="label">Payment Mode</div>
        <div class="val">${invoice.paymentMethod || 'UPI / Online'}</div>
      </div>
    </div>

    <!-- Parties Grid -->
    <div class="parties-grid">
      <div class="card-block">
        <div class="card-title">Customer Information (Billed To)</div>
        <div class="info-row">
          <span class="info-lbl">Customer Name</span>
          <span class="info-val">${invoice.customerName}</span>
        </div>
        <div class="info-row">
          <span class="info-lbl">Mobile</span>
          <span class="info-val">${invoice.mobile || 'N/A'}</span>
        </div>
        <div class="info-row">
          <span class="info-lbl">Email</span>
          <span class="info-val">${invoice.email || 'customer@batohidriver.com'}</span>
        </div>
      </div>

      <div class="card-block">
        <div class="card-title">Ride & Driver Details</div>
        <div class="info-row">
          <span class="info-lbl">Vehicle</span>
          <span class="info-val">${invoice.vehicleName} (${invoice.vehicleType})</span>
        </div>
        <div class="info-row">
          <span class="info-lbl">Vehicle Reg No.</span>
          <span class="info-val">${invoice.vehicleNumber || 'N/A'}</span>
        </div>
        <div class="info-row">
          <span class="info-lbl">Assigned Driver</span>
          <span class="info-val">${invoice.driverName} (${invoice.driverMobile || 'N/A'})</span>
        </div>
      </div>
    </div>

    <!-- Trip Route -->
    <div class="route-box">
      <div class="route-title">Trip Route Details</div>
      <div class="route-row">
        <span class="route-badge-pickup">PICKUP</span>
        <span><strong>${invoice.pickupLocation}</strong></span>
      </div>
      <div class="route-row">
        <span class="route-badge-drop">DROP</span>
        <span><strong>${invoice.dropLocation}</strong></span>
      </div>
      <div class="route-row" style="margin-top: 8px; color: #64748b; font-size: 11px;">
        <span>Journey Date: <strong>${invoice.bookingDate} ${invoice.bookingTime ? 'at ' + invoice.bookingTime : ''}</strong></span>
        <span style="margin-left: 16px;">Distance: <strong>${invoice.distance}</strong></span>
      </div>
    </div>

    <!-- Price Table -->
    <table class="fare-table">
      <thead>
        <tr>
          <th>Description</th>
          <th style="width: 100px;">SAC Code</th>
          <th style="width: 120px;" class="text-right">Rate</th>
          <th style="width: 120px;" class="text-right">Amount (₹)</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <strong>Passenger Cab Transportation Service</strong><br />
            <span style="font-size: 11px; color: #64748b;">Base fare for ride ${invoice.bookingNumber} (${invoice.distance})</span>
          </td>
          <td>996412</td>
          <td class="text-right">₹${Number(fare).toLocaleString('en-IN')}</td>
          <td class="text-right">₹${Number(fare).toLocaleString('en-IN')}</td>
        </tr>
        <tr>
          <td>Central GST (CGST @ 2.5%)</td>
          <td>996412</td>
          <td class="text-right">2.5%</td>
          <td class="text-right">₹${Number(cgst).toLocaleString('en-IN')}</td>
        </tr>
        <tr>
          <td>State GST (SGST @ 2.5%)</td>
          <td>996412</td>
          <td class="text-right">2.5%</td>
          <td class="text-right">₹${Number(sgst).toLocaleString('en-IN')}</td>
        </tr>
        ${
          invoice.discount
            ? `<tr>
          <td colspan="3" style="color: #16a34a;">Promotional Discount Applied</td>
          <td class="text-right" style="color: #16a34a;">-₹${Number(invoice.discount).toLocaleString('en-IN')}</td>
        </tr>`
            : ''
        }
        <tr class="total-row">
          <td colspan="3" class="text-right">Grand Total (Inclusive of Taxes)</td>
          <td class="text-right">₹${Number(total).toLocaleString('en-IN')}</td>
        </tr>
      </tbody>
    </table>

    <!-- Amount in Words -->
    <div class="words-box">
      Amount Chargeable (in words): <strong>${amountInWords}</strong>
    </div>

    <!-- Footer Notes & Signature -->
    <div class="footer-note">
      <div>
        <p><strong>Terms & Conditions:</strong></p>
        <p>1. This is an electronically generated tax invoice and does not require a physical signature.</p>
        <p>2. Applicable taxes charged under Reverse Charge / Section 9(5) of the CGST Act 2017.</p>
        <p>3. For questions or support, reach out to help@batohidriver.com.</p>
      </div>
      <div class="signature-box">
        <div class="sign-title">Authorized Signatory</div>
        <div style="font-size: 10px; color: #94a3b8; margin-top: 2px;">Batohi Technologies Pvt Ltd</div>
      </div>
    </div>
  </div>
</body>
</html>`
  },

  // Trigger printable view / Save-as-PDF dialog
  downloadInvoice(invoice) {
    if (!invoice) return

    const html = this.generateInvoiceHtml(invoice)
    const printFrame = document.createElement('iframe')
    printFrame.style.position = 'fixed'
    printFrame.style.right = '0'
    printFrame.style.bottom = '0'
    printFrame.style.width = '0'
    printFrame.style.height = '0'
    printFrame.style.border = '0'

    document.body.appendChild(printFrame)

    const doc = printFrame.contentWindow.document
    doc.open()
    doc.write(html)
    doc.close()

    printFrame.contentWindow.focus()
    setTimeout(() => {
      try {
        printFrame.contentWindow.print()
      } catch (err) {
        console.warn('Print iframe error, opening popup window fallback:', err)
        const win = window.open('', '_blank')
        if (win) {
          win.document.write(html)
          win.document.close()
          win.focus()
          win.print()
        }
      } finally {
        setTimeout(() => {
          if (document.body.contains(printFrame)) {
            document.body.removeChild(printFrame)
          }
        }, 3000)
      }
    }, 500)
  },

  // Download standalone offline HTML invoice file
  downloadInvoiceFile(invoice) {
    if (!invoice) return
    const html = this.generateInvoiceHtml(invoice)
    const blob = new Blob([html], { type: 'text/html;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `Invoice-${invoice.invoiceNumber || 'BatohiDrive'}.html`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }
}

export default invoiceService
