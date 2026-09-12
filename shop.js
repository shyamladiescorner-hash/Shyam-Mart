const router=require("express").Router();
const db=require("../db");
const auth=require("../middleware/auth");

const DEFAULTS={
 name:"Shyam Ladies Corner",brand_name:"Shyam Mart",tagline:"Har Style, Ek Hi Corner.",
 mobile_numbers:["6204519059","9931083266","9576727458"],whatsapp:"9931083266",
 address:"Mushahari Urf Radhanagarh",city:"Muzaffarpur",state:"Bihar",pin:"842002",
 opening_time:"07:00",closing_time:"23:00",
 maps_url:"https://maps.app.goo.gl/qMzntMzG4NXTsYCs9?g_st=ac"
};
router.get("/profile",async(_req,res,next)=>{try{const r=await db.query(`SELECT data,updated_at FROM shop_settings WHERE id=1`);res.json({profile:r.rows[0]?.data||DEFAULTS,updated_at:r.rows[0]?.updated_at||null})}catch(e){next(e)}});
router.put("/profile",auth(["admin"]),async(req,res,next)=>{try{const incoming=req.body||{};const profile={...DEFAULTS,...incoming};profile.mobile_numbers=Array.isArray(incoming.mobile_numbers)?incoming.mobile_numbers:DEFAULTS.mobile_numbers;const r=await db.query(`INSERT INTO shop_settings(id,data,updated_at) VALUES(1,$1,NOW()) ON CONFLICT(id) DO UPDATE SET data=$1,updated_at=NOW() RETURNING data,updated_at`,[JSON.stringify(profile)]);res.json({profile:r.rows[0].data,updated_at:r.rows[0].updated_at})}catch(e){next(e)}});
module.exports=router;
