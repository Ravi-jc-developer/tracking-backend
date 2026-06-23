const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema(
  {
    agentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Agent ID is required'],
      index: true,
    },

    punchInTime: {
      type: Date,
      required: [true, 'Punch-in time is required'],
    },

    punchOutTime: {
      type: Date,
      default: null,
    },

    punchInLat: {
      type: Number,
      required: [true, 'Punch-in latitude is required'],
      min: -90,
      max: 90,
    },

    punchInLng: {
      type: Number,
      required: [true, 'Punch-in longitude is required'],
      min: -180,
      max: 180,
    },

    punchOutLat: {
      type: Number,
      min: -90,
      max: 90,
      default: null,
    },

    punchOutLng: {
      type: Number,
      min: -180,
      max: 180,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Attendance', attendanceSchema);