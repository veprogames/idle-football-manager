class AbstractUpgrade
{
    constructor(getPrice, getEffect, cfg)
    {
        this.getPrice = getPrice;
        this.getEffect = getEffect;
        this.cfg = cfg;
        this.level = new Decimal(0);
        this.maxLevel = cfg && cfg.maxLevel ? new Decimal(cfg.maxLevel) : Infinity;
        this.getEffectDisplay = cfg && cfg.getEffectDisplay ? cfg.getEffectDisplay : this.getEffectDisplay;
        this.description = this.getDescription();
    }

    getDescription()
    {
        return null;
    }

    currentPrice()
    {
        return this.getPrice(this.level);
    }

    apply()
    {
        return this.getEffect(this.level);
    }

    getEffectDisplay()
    {
        if(this.level.eq(this.maxLevel))
        {
            return "x" + functions.formatNumber(this.apply(), 2, 2);
        }
        return "x" + functions.formatNumber(this.getEffect(this.level), 2, 2) + " 🠚 " +
            "x" + functions.formatNumber(this.getEffect(this.level.add(1)), 2, 2);
    }

    getPriceDisplay()
    {
        if(this.level.eq(this.maxLevel))
        {
            return "Max";
        }
        return functions.formatNumber(this.currentPrice(), 2, 0, 1e9);
    }

    setRequirements(requires, blacklist)
    {
        this.requires = requires;
        this.blacklist = blacklist;
    }

    isBuyable()
    {
        return this.isUnlocked() && !this.isLocked();
    }
}