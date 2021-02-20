const router = require('express').Router();
const couponModel = require('../models/couponModel');

const isNullOrUndefined = (obj) => {
    for (const [key, value] of Object.entries(obj)) {
        if (value === null || value === undefined) {
            return true;
        }
    }
    return false;
};

// Route for getting coupons whose end date is equal or greater than today's date
router.get("/", async (req, res) => {
    await couponModel.find({}).
        then((data) => {
            const couponCodes = data.filter((item) => {
                return new Date(item.endDate) >= new Date();
            }).map((item) => item.code);
            res.status(200).send({ couponCodes });
        })
        .catch(err => res.status(400).send({
            err: "Error Occurred",
        }));
})

// Route for creating a coupon
router.post("/add", async (req, res) => {
    const { code, startDate, endDate, minAmtCode, discType,
        flatDiscount, percentDiscount, maxPercentageAmount
    } = req.body;
    const flatDiscountObj = { code, startDate, endDate, minAmtCode, discType, flatDiscount };
    const percentageDiscount = { code, startDate, endDate, minAmtCode, discType, percentDiscount, maxPercentageAmount };
    if (!isNullOrUndefined(flatDiscountObj) || !isNullOrUndefined(percentageDiscount)) {
        const newCoupon = discType === 'f' ?
            new couponModel({ code, startDate, endDate, minAmtCode, discType, flatDiscount })
            :
            new couponModel({ code, startDate, endDate, minAmtCode, discType, percentDiscount, maxPercentageAmount });

        newCoupon.save()
            .then(r => res.status(200).send({ success: true }))
            .catch((err) => {
                const message = err.errors ?
                    err.errors.code ?? err.errors.startDate ??
                    err.errors.endDate ?? err.errors.minAmtCode ?? err.errors.percentDiscount
                    ?? err.errors.discType
                    :
                    (err.code === 11000 ? { message: "'Coupon Code already present'" } : { message: err });

                res.status(400).send({ err: message.message });
            });
    } else {
        res.status(400).send({ err: "Please enter correct data" });
    }
})

// Route for calculating a discount
router.post("/discount", async (req, res) => {
    const { code, totalValue } = req.body;
    if (isNullOrUndefined({ code, totalValue })) {
        res.status(400).send({ err: "Please enter correct data" });
    } else {
        const verifyCoupon = await couponModel.findOne({ code });
        const currentDate = new Date();
        if (!isNullOrUndefined({ verifyCoupon }) && currentDate <= new Date(verifyCoupon.endDate)
            && totalValue >= verifyCoupon.minAmtCode) {
            const { discType,
                flatDiscount, percentDiscount, maxPercentageAmount
            } = verifyCoupon;

            let discValue = 0;

            if (discType === 'f') {
                discValue = totalValue - flatDiscount;
            } else {
                const perDisc = Math.floor((totalValue * percentDiscount) / 100);
                discValue = totalValue - perDisc > maxPercentageAmount ? totalValue - maxPercentageAmount : totalValue - perDisc;
            }
            discValue = discValue < 0 ? 0 : discValue;
            res.status(200).send({ discValue });

        }
        else {
            res.status(400).send({ err: "Coupon is not valid" });
        }
    }


});

module.exports = router;

