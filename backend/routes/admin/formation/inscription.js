import express from "express";
import { getGroups, createGroup } from "../../../models/group";
import {
  archiveInscription,
  getInscription,
  setGroup,
} from "../../../models/inscription";
import { getSalles } from "../../../models/salles";
import { getTeachers } from "../../../models/teachers";
const router = express.Router();

// get insciption
router.get("/:inId", async (req, res) => {
  console.log(req);
  const { inId } = req.params;
  const { formation } = req;

  const inscription = await getInscription(inId);
  const groups = await getGroups(formation);

  const salles = await getSalles();
  const teachers = await getTeachers();

  res.render("demande", {
    inscription,
    groups,
    salles,
    teachers,
  });
});

// archive insciption
router.get("/:inId/archive", async (req, res) => {
  const { inId } = req.params;

  await archiveInscription(inId);
  res.redirect("../..");
});

// set insciption group
router.post("/:inId", async (req, res) => {
  const { inId } = req.params;
  const { formation } = req;

  const { teacher, salle, time, groupe: selectedGroup } = req.body;
  let group;
  if (selectedGroup) {
    group = selectedGroup;
  } else if (time) {
    group = await createGroup(formation, salle, teacher, time);
  }

  await setGroup(inId, group);

  res.redirect("/admin/formation/" + formation);
});

// set insciption group
router.post("/:inId", (req, res) => {
  const { group } = req.body;
});

export default router;
