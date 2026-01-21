// ✅ ESM
const verificationCodeTemplate = (code) => `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #ddd; padding: 20px; border-radius: 10px; background-color: #f9f9f9;">
    <h1 style="color: #333; text-align: center;">Verification Code</h1>
    <p style="font-size: 16px; color: #555;">Hello,</p>
    <p style="font-size: 16px; color: #555;">Thank you for using our services. Your verification code is:</p>
    <p style="font-size: 24px; font-weight: bold; text-align: center; color: #007BFF;">${code}</p>
    <p style="font-size: 16px; color: #555;">Please enter this code within 5 minutes to verify your account.</p>
    <p style="font-size: 16px; color: #555;">If you did not request this code, please ignore this email.</p>
    <footer style="border-top: 1px solid #ddd; padding-top: 10px; margin-top: 20px; text-align: center; font-size: 12px; color: #aaa;">
      &copy; 2023 Your Company Name. All rights reserved.
    </footer>
  </div>
`;

export default verificationCodeTemplate;

export const getPaymentSuccessTemplate = ({ name, eventId, slots }) => {
  const slotDetails = slots
    .map(
      (slot, index) =>
        `<li><strong>Slot ${index + 1}:</strong> ${slot.date} from ${slot.startTime} to ${slot.endTime}</li>`
    )
    .join('');

  return `
    <div style="font-family: Arial, sans-serif; padding: 20px;">
      <h2>✅ Booking Confirmed</h2>
      <p>Dear ${name},</p>
      <p>Your payment has been successfully received and your booking has been confirmed.</p>
      <p><strong>Event ID:</strong> ${eventId}</p>
      <p><strong>Slot(s) Booked:</strong></p>
      <ul>
        ${slotDetails}
      </ul>
      <br />
      <p>Thank you for choosing our service.</p>
      <p>We look forward to seeing you at the event.</p>
      <br />
    
      
    </div>
  `;
};

// auto refunded template

export const getConflictAfterPaymentTemplate = ({
  name,
  email,
  phone,
  eventId,
  eventTitle,
  selectedDate,
  selectedSlots = [],
  sessionId,
  paymentIntentId,
  refundAmount
}) => {
  const slotDetails = selectedSlots
    .map(
      (slot, index) =>
        `<li><strong>Slot ${index + 1}:</strong> ${slot.date} from ${slot.startTime} to ${slot.endTime}</li>`
    )
    .join('');

  return `
    <div style="font-family: Arial, sans-serif; padding: 20px;">
      <h2>⚠️ Booking Conflict Detected After Payment</h2>

      <p><strong>Customer Details:</strong></p>
      <ul>
        <li><strong>Name:</strong> ${name}</li>
        <li><strong>Email:</strong> ${email}</li>
        <li><strong>Phone:</strong> ${phone}</li>
      </ul>

      <p><strong>Event Details:</strong></p>
      <ul>
        <li><strong>Event ID:</strong> ${eventId}</li>
        <li><strong>Event Title:</strong> ${eventTitle || 'N/A'}</li>
        <li><strong>Date:</strong> ${selectedDate}</li>
      </ul>

      <p><strong>Attempted Slot(s):</strong></p>
      <ul>
        ${slotDetails}
      </ul>

      <p><strong>Stripe Info:</strong></p>
      <ul>
        <li><strong>Session ID:</strong> ${sessionId}</li>
        <li><strong>Payment Intent ID:</strong> ${paymentIntentId}</li>
        ${
          refundAmount
            ? `<li><strong>Refund Amount:</strong> $${(refundAmount / 100).toFixed(2)}</li>`
            : ''
        }
        <li><strong>Refund Status:</strong> Refund automatically processed</li>
      </ul>

      <p><strong>Time:</strong> ${new Date().toLocaleString()}</p>

      <br />
      <p style="color: red;">
        ⚠️ Some of the selected slots were already booked by the time payment completed.<br/>
        The booking was not created, and the payment has been refunded.
      </p>
    </div>
  `;
};

export const getPaymentSuccessForAdminTemplate = ({
  name,
  email,
  phone,
  eventId,
  slots
}) => {
  const slotDetails = slots
    .map(
      (slot, index) =>
        `<li><strong>Slot ${index + 1}:</strong> ${slot.date} from ${slot.startTime} to ${slot.endTime}</li>`
    )
    .join('');

  return `
    <div style="font-family: Arial, sans-serif; padding: 20px;">
      <h2>📥 New Booking Received</h2>
      <p><strong>User Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Event ID:</strong> ${eventId}</p>
      <p><strong>Slot(s) Booked:</strong></p>
      <ul>
        ${slotDetails}
      </ul>
      <br />
      <p>This booking has been paid and confirmed via Stripe.</p>
      <p>Please make necessary arrangements for the event.</p>
    </div>
  `;
};

// ✅ Announcement Submission - Email to Dealer/User
export const getSubmissionConfirmationTemplate = ({
  dealerName,
  dealerId,
  vin,
  model,
  series,
  vehicleYear,
  floorPrice,
  auctionName
}) => {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #ddd; padding: 20px; border-radius: 10px; background-color: #f9f9f9;">
      <h1 style="color: #333; text-align: center;">✅ Announcement Submitted Successfully</h1>
      
      <p style="font-size: 16px; color: #555;">Dear <strong>${dealerName}</strong>,</p>
      
      <p style="font-size: 16px; color: #555;">Thank you for submitting your announcement. We have received your submission and it is now under review.</p>
      
      <p style="font-size: 16px; color: #555;"><strong>Submission Details:</strong></p>
      <ul style="font-size: 15px; color: #555;">
        <li><strong>Dealer ID:</strong> ${dealerId}</li>
        <li><strong>Vehicle VIN:</strong> ${vin}</li>
        <li><strong>Model:</strong> ${model}</li>
        <li><strong>Series:</strong> ${series}</li>
        <li><strong>Year:</strong> ${vehicleYear}</li>
        <li><strong>Floor Price:</strong> $${floorPrice}</li>
        <li><strong>Auction:</strong> ${auctionName}</li>
      </ul>
      
      <p style="font-size: 16px; color: #555;">Our team will review your announcement and get back to you shortly.</p>
      
      <p style="font-size: 16px; color: #555;">If you have any questions, please don't hesitate to contact us.</p>
      
      <footer style="border-top: 1px solid #ddd; padding-top: 10px; margin-top: 20px; text-align: center; font-size: 12px; color: #aaa;">
        All rights reserved.
      </footer>
    </div>
  `;
};

// ✅ Announcement Submission - Email to Admin
export const getSubmissionAdminNotificationTemplate = ({
  dealerName,
  dealerId,
  dealerEmail,
  dealerContact,
  vin,
  model,
  series,
  vehicleYear,
  mileage,
  floorPrice,
  interiorChoice,
  auctionName,
  announcement,
  remarks
}) => {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 800px; margin: auto; border: 1px solid #ddd; padding: 20px; border-radius: 10px; background-color: #f9f9f9;">
      <h1 style="color: #333; text-align: center;">📨 New Announcement Submission</h1>
      
      <h2 style="color: #007BFF; border-bottom: 2px solid #007BFF; padding-bottom: 10px;">Dealer Information</h2>
      <ul style="font-size: 15px; color: #555;">
        <li><strong>Dealer Name:</strong> ${dealerName}</li>
        <li><strong>Dealer ID:</strong> ${dealerId}</li>
        <li><strong>Email:</strong> <a href="mailto:${dealerEmail}">${dealerEmail}</a></li>
        <li><strong>Contact:</strong> ${dealerContact}</li>
      </ul>
      
      <h2 style="color: #007BFF; border-bottom: 2px solid #007BFF; padding-bottom: 10px;">Vehicle Information</h2>
      <ul style="font-size: 15px; color: #555;">
        <li><strong>VIN:</strong> ${vin}</li>
        <li><strong>Model:</strong> ${model}</li>
        <li><strong>Series:</strong> ${series}</li>
        <li><strong>Year:</strong> ${vehicleYear}</li>
        <li><strong>Mileage:</strong> ${mileage} miles</li>
        <li><strong>Interior Choice:</strong> ${interiorChoice}</li>
      </ul>
      
      <h2 style="color: #007BFF; border-bottom: 2px solid #007BFF; padding-bottom: 10px;">Auction & Pricing</h2>
      <ul style="font-size: 15px; color: #555;">
        <li><strong>Auction:</strong> ${auctionName}</li>
        <li><strong>Floor Price:</strong> $${floorPrice}</li>
      </ul>
      
      <h2 style="color: #007BFF; border-bottom: 2px solid #007BFF; padding-bottom: 10px;">Announcement</h2>
      <p style="font-size: 15px; color: #555; background-color: #f0f0f0; padding: 10px; border-radius: 5px;">${announcement}</p>
      
      ${
        remarks
          ? `
        <h2 style="color: #007BFF; border-bottom: 2px solid #007BFF; padding-bottom: 10px;">Remarks</h2>
        <p style="font-size: 15px; color: #555; background-color: #f0f0f0; padding: 10px; border-radius: 5px;">${remarks}</p>
      `
          : ''
      }
      
      <p style="font-size: 16px; color: #d9534f; margin-top: 20px; padding: 10px; background-color: #f9d6d6; border-radius: 5px;">
        <strong>Action Required:</strong> Please review this announcement and take appropriate action.
      </p>
      
      <footer style="border-top: 1px solid #ddd; padding-top: 10px; margin-top: 20px; text-align: center; font-size: 12px; color: #aaa;">
        &copy; 2026 DMC Auctions. All rights reserved.
      </footer>
    </div>
  `;
};
