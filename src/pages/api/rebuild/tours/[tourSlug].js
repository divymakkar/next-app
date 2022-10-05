import dotenv from "dotenv";
dotenv.config();

export default async function tourPageHandler(req, res) {
  // Check for secret to confirm this is a valid request
  // if (req.query.secret !== process.env.MY_SECRET_TOKEN) {
  //   return res.status(401).json({ message: "Invalid token" });
  // }
  const { tourSlug } = req.query;
  try {
    let token = req.headers["x-access-token"] || req.headers["authorization"];
    token = token.replace(/^Bearer\s+/, "");

    if (token !== process.env.PAGE_REBUILD_TOKEN) {
      return res.status(401).send({ msg: "Unauthorized" });
    } else {
      await res.revalidate(`/tours/${tourSlug}`);
      return res.json({ revalidated: true });
    }
  } catch (err) {
    // If there was an error, Next.js will continue
    // to show the last successfully generated page
    return res.status(500).send("Error revalidating");
  }
}
