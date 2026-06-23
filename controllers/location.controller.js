import Location from "../models/Location.js";

export const saveLocation = async (req, res) => {
  try {
    const { lat, lng, agentId } = req.body;

    await Location.create({
      //   agentId: req.user._id,
      agentId: agentId,
      latitude: lat,
      longitude: lng,
    });

    return res.json({
      success: true,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};


export const getHistory = async (req, res) => {
  try {
    const { agentId } = req.params;

    const locations = await Location.find({
      agentId,
    })
      .sort({ timestamp: 1 })
      .select("latitude longitude timestamp");

    res.json({
      success: true,
      data: locations,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};