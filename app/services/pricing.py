class PricingService:
    def break_even(self,fixed:float,price:float,variable:float)->float:
        return fixed/(price-variable)
