// import mongoose from 'mongoose';

// const contactSchema = new mongoose.Schema(
//   {
//     name: { type: String, required: true },
//     phoneNumber: { type: String, required: true },
//     email: { type: String },
//     isFavourite: { type: Boolean, default: false },
//     contactType: {
//       type: String,
//       enum: ['work', 'home', 'personal'],
//       required: true,
//       default: 'personal',
//     },
//   },
//   { timestamps: true }
// );

// export const Contact = mongoose.model('Contact', contactSchema);

// src/models/contact.js
import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    email: { type: String },
    isFavourite: { type: Boolean, default: false },
    contactType: { type: String, enum: ['work', 'home', 'personal'], default: 'personal' },
  },
  { timestamps: true } // автоматически добавлять createdAt и updatedAt
);

const Contact = mongoose.model('Contact', contactSchema);

export default Contact;

