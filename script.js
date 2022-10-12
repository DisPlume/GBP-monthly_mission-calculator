class OverwatchCalculator {
    static currentSeason() {
        return 1;
    }

    static currentSeasonStart() {
        return new Date('2022-10-04');
    }

    static currentSeasonEnd() {
        return new Date('2022-12-06');
    }

    static remainingDays() {
        return (this.currentSeasonEnd() - new Date()) / 86400000;
    }

    static currentDay() {
        return (new Date() - this.currentSeasonStart()) / 86400000;
    }

    static currentTier() {
        return parseInt(document.getElementsByName('current_tier')[0].value || '0');
    }

    static currentTierXp() {
        return parseInt(document.getElementsByName('current_tier_xp')[0].value || '0');
    }

    static currentXp() {
        return (this.currentTier() * 10000) + this.currentTierXp();
    }

    static currentPercent() {
        return (this.currentTier() / 80) * 100;
    }

    static remainingTiers() {
        return 80 - this.currentTier();
    }

    static remainingXp() {
        return (80 * 10000) - this.currentXp();
    }

    static remainingPercent() {
        return (this.remainingTiers() / 80) * 100;
    }

    static dailyAverageTiers() {
        return this.currentTier() / this.currentDay();
    }

    static dailyAverageXp() {
        return this.currentXp() / this.currentDay();
    }

    static dailyAveragePercent() {
        return this.currentPercent() / this.currentDay();
    }

    static weeklyAverageTiers() {
        return this.dailyAverageTiers() * 7;
    }

    static weeklyAverageXp() {
        return this.dailyAverageXp() * 7;
    }

    static weeklyAveragePercent() {
        return this.dailyAveragePercent() * 7;
    }

    static dailyGoalTiers() {
        return this.remainingTiers() / this.remainingDays();
    }

    static dailyGoalXp() {
        return this.remainingXp() / this.remainingDays();
    }

    static dailyGoalPercent() {
        return this.remainingPercent() / this.remainingDays();
    }

    static weeklyGoalTiers() {
        return this.dailyGoalTiers() * 7;
    }

    static weeklyGoalXp() {
        return this.dailyGoalXp() * 7;
    }

    static weeklyGoalPercent() {
        return this.dailyGoalPercent() * 7;
    }

    static expectedPlayDays() {
        return parseInt(document.getElementsByName('expected_play_days')[0].value || '0');
    }

    static expectedDailies() {
        return parseInt(document.getElementsByName('expected_dailies')[0].value || '0');
    }

    static expectedWeeklies() {
        return parseInt(document.getElementsByName('expected_weeklies')[0].value || '0');
    }

    static expectedDailyMatches() {
        return parseInt(document.getElementsByName('expected_daily_matches')[0].value || '0');
    }

    static expectedMatchXp() {
        return parseInt(document.getElementsByName('expected_match_xp')[0].value || '0');
    }

    static expectedDailyMatchXp() {
        return ((this.expectedDailyMatches() * this.expectedMatchXp()) * this.expectedPlayDays()) / 7;
    }

    static expectedDailyDailiesXp() {
        if (this.expectedDailies() >= 3) return 9000;
        else if (this.expectedDailies() >= 2) return 6000;
        else if (this.expectedDailies() >= 1) return 3000;
        return 0;
    }

    static expectedDailyWeekliesXp() {
        return (this.expectedWeeklies() * 5000) / 7;
    }

    static expectedDailyTiers() {
        return this.expectedDailyXp() / 10000;
    }

    static expectedDailyXp() {
        return this.expectedDailyMatchXp() + this.expectedDailyDailiesXp() + this.expectedDailyWeekliesXp();
    }

    static expectedDailyPercent() {
        return (this.expectedDailyXp() / 800000) * 100;
    }

    static expectedWeeklyTiers() {
        return this.expectedDailyTiers() * 7;
    }

    static expectedWeeklyXp() {
        return this.expectedDailyXp() * 7;
    }

    static expectedWeeklyPercent() {
        return this.expectedDailyPercent() * 7;
    }

    static expectedXp() {
        return this.expectedDailyXp() * this.remainingDays();
    }

    static spareDays() {
        let required = 80 * 10000;
        let have = this.currentXp();
        let need = required - have;
        let expecting = this.expectedXp();
        let extra = expecting - need;
        return extra / this.expectedDailyXp();
    }

    static spareTiers() {
        let required = 80 * 10000;
        let have = this.currentXp();
        let need = required - have;
        let expecting = this.expectedXp();
        let missing = need - expecting;
        return Math.ceil(missing / 10000);
    }

    static spareTiersCost() {
        return this.spareTiers() * 200;
    }

    static spareTiersCostUsd() {
        return this.spareTiersCost() / 100;
    }

    static daysPerLegendary() {
        let weekly = 0;
        if (this.expectedWeeklies() >= 4) {
            weekly = 30;
        }
        if (this.expectedWeeklies() >= 8) {
            weekly = 50;
        }
        if (this.expectedWeeklies() >= 11) {
            weekly = 60;
        }
        return (2000 / weekly) * 7;
    }

    static update() {
        //progress
        document.getElementById('progress_days').innerText = new Intl.NumberFormat(undefined, {maximumFractionDigits: 0}).format(this.currentDay()) + ' days';
        document.getElementById('progress_tiers').innerText = new Intl.NumberFormat(undefined, {maximumFractionDigits: 2}).format(this.currentTier()) + ' tiers';
        document.getElementById('progress_xp').innerText = new Intl.NumberFormat(undefined, {maximumFractionDigits: 0}).format(this.currentXp()) + ' XP';
        document.getElementById('progress_percent').innerText = new Intl.NumberFormat(undefined, {maximumFractionDigits: 2}).format(this.currentPercent()) + '%';

        //remaining
        document.getElementById('remaining_days').innerText = new Intl.NumberFormat(undefined, {maximumFractionDigits: 0}).format(this.remainingDays()) + ' days';
        document.getElementById('remaining_tiers').innerText = new Intl.NumberFormat(undefined, {maximumFractionDigits: 2}).format(this.remainingTiers()) + ' tiers';
        document.getElementById('remaining_xp').innerText = new Intl.NumberFormat(undefined, {maximumFractionDigits: 0}).format(this.remainingXp()) + ' XP';
        document.getElementById('remaining_percent').innerText = new Intl.NumberFormat(undefined, {maximumFractionDigits: 2}).format(this.remainingPercent()) + '%';

        //daily averages
        document.getElementById('daily_average_tiers').innerText = new Intl.NumberFormat(undefined, {maximumFractionDigits: 2}).format(this.dailyAverageTiers()) + ' tiers';
        document.getElementById('daily_average_xp').innerText = new Intl.NumberFormat(undefined, {maximumFractionDigits: 0}).format(this.dailyAverageXp()) + ' XP';
        document.getElementById('daily_average_percent').innerText = new Intl.NumberFormat(undefined, {maximumFractionDigits: 2}).format(this.dailyAveragePercent()) + '%';

        //weekly averages
        document.getElementById('weekly_average_tiers').innerText = new Intl.NumberFormat(undefined, {maximumFractionDigits: 2}).format(this.weeklyAverageTiers()) + ' tiers';
        document.getElementById('weekly_average_xp').innerText = new Intl.NumberFormat(undefined, {maximumFractionDigits: 0}).format(this.weeklyAverageXp()) + ' XP';
        document.getElementById('weekly_average_percent').innerText = new Intl.NumberFormat(undefined, {maximumFractionDigits: 2}).format(this.weeklyAveragePercent()) + '%';

        //daily goals
        document.getElementById('daily_goal_tiers').innerText = new Intl.NumberFormat(undefined, {maximumFractionDigits: 2}).format(this.dailyGoalTiers()) + ' tiers';
        document.getElementById('daily_goal_xp').innerText = new Intl.NumberFormat(undefined, {maximumFractionDigits: 0}).format(this.dailyGoalXp()) + ' XP';
        document.getElementById('daily_goal_percent').innerText = new Intl.NumberFormat(undefined, {maximumFractionDigits: 2}).format(this.dailyGoalPercent()) + '%';

        //weekly goals
        document.getElementById('weekly_goal_tiers').innerText = new Intl.NumberFormat(undefined, {maximumFractionDigits: 2}).format(this.weeklyGoalTiers()) + ' tiers';
        document.getElementById('weekly_goal_xp').innerText = new Intl.NumberFormat(undefined, {maximumFractionDigits: 0}).format(this.weeklyGoalXp()) + ' XP';
        document.getElementById('weekly_goal_percent').innerText = new Intl.NumberFormat(undefined, {maximumFractionDigits: 2}).format(this.weeklyGoalPercent()) + '%';

        //expected daily gains
        document.getElementById('expected_daily_tiers').innerText = new Intl.NumberFormat(undefined, {maximumFractionDigits: 2}).format(this.expectedDailyTiers()) + ' tiers';
        document.getElementById('expected_daily_xp').innerText = new Intl.NumberFormat(undefined, {maximumFractionDigits: 0}).format(this.expectedDailyXp()) + ' XP';
        document.getElementById('expected_daily_percent').innerText = new Intl.NumberFormat(undefined, {maximumFractionDigits: 2}).format(this.expectedDailyPercent()) + '%';

        //expected daily gains
        document.getElementById('expected_weekly_tiers').innerText = new Intl.NumberFormat(undefined, {maximumFractionDigits: 2}).format(this.expectedWeeklyTiers()) + ' tiers';
        document.getElementById('expected_weekly_xp').innerText = new Intl.NumberFormat(undefined, {maximumFractionDigits: 0}).format(this.expectedWeeklyXp()) + ' XP';
        document.getElementById('expected_weekly_percent').innerText = new Intl.NumberFormat(undefined, {maximumFractionDigits: 2}).format(this.expectedWeeklyPercent()) + '%';

        //completion
        document.getElementById('prompt_spare_days').style.display = 'none';
        document.getElementById('prompt_spare_tiers').style.display = 'none';
        if (this.spareDays() >= 0) {
            document.getElementById('prompt_spare_days').style.display = 'inline';
            document.getElementById('spare_days').innerText = new Intl.NumberFormat(undefined, {maximumFractionDigits: 0}).format(Math.floor(this.spareDays())) + ' days';
        } else {
            document.getElementById('prompt_spare_tiers').style.display = 'inline';
            document.getElementById('spare_tiers').innerText = new Intl.NumberFormat(undefined, {maximumFractionDigits: 0}).format(Math.ceil(this.spareTiers())) + ' tiers';
            document.getElementById('spare_tiers_cost').innerText = new Intl.NumberFormat(undefined, {maximumFractionDigits: 0}).format(Math.ceil(this.spareTiersCost())) + ' coins';
            document.getElementById('spare_tiers_cost_usd').innerText = '$' + new Intl.NumberFormat(undefined, {maximumFractionDigits: 2}).format(this.spareTiersCostUsd()) + ' USD';
        }

        //days per legendary
        //TODO: this is calculating wrong.... 9 and 10 for example should take just as long but they aren't
        document.getElementById('days_per_legendary').innerText = new Intl.NumberFormat(undefined, {maximumFractionDigits: 0}).format(Math.ceil(this.daysPerLegendary())) + ' days';
    }
}

OverwatchCalculator.update();