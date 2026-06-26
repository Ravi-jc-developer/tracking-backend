import Location from "../models/Location.js";
import Trek from "../models/Trek.js";

export const saveLocation = async (req, res) => {
  try {
    const { lat, lng, agentId, trekId } = req.body;

    await Location.create({
      //   agentId: req.user._id,
      agentId: agentId,
      trekId: trekId,
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
    // console.log(agentId);

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

export const createTrekSession = async (req, res) => {
  try {
    const { agentId } = req.body;
    // console.log(agentId);

    const newTrek = await Trek.create({
      agentId: agentId,
      startedAt: Date.now(),
      status: 'active'
    })

    res.json({
      success: true,
      trekId: newTrek?._id,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
}


export const updateTrekSession = async (req, res) => {
  try {
    const { trekId } = req.params;

    const newTrek = await Trek.updateOne(
      { _id: trekId },
      {
        endedAt: Date.now(),
        status: 'completed'
      }
    )
    // console.log(newTrek)
    if (newTrek.modifiedCount > 0) {
      res.json({
        success: true,
      });
    }

    res.json({
      success: false,
      message: "trekId does not exist"
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
}

export const getTreks = async (req, res) => {
  try {
    const { agentId } = req.params;

    const treks = await Trek.find({ agentId })
      .sort({ timestamp: 1 })
      .lean();

    const trekIds = treks.map(trek => trek._id);

    const locations = await Location.find({
      trekId: { $in: trekIds },
    }).lean();

    // Group locations by trekId
    const locationMap = locations.reduce((acc, loc) => {
      const key = loc.trekId.toString();
      if (!acc[key]) acc[key] = [];
      acc[key].push(loc);
      return acc;
    }, {});

    // Attach locations to each trek
    const response = treks.map(trek => ({
      ...trek,
      locations: locationMap[trek._id.toString()] || [],
    }));

    res.json({
      success: true,
      data: response,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
}