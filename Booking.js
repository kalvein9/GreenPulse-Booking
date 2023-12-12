// Initialize overall booking cost to 0
var overallBookingCost = 0;

// Function to calculate loyalty points based on the number of rooms
function calculateLoyaltyPoints(numRooms) {
    // If the number of rooms is greater than 3, award 20 loyalty points per room
    if (numRooms > 3) {
        return numRooms * 20;
    }
    return 0;
}

// Function to update loyalty points in local storage and display to the user
function updateLoyaltyPoints(numRooms) {
    var loyaltyPoints = calculateLoyaltyPoints(numRooms);

    // Store loyalty points in local storage
    localStorage.setItem("loyaltyPoints", loyaltyPoints);

    // Display loyalty points to the user
    document.getElementById("loyaltyPoints").value = loyaltyPoints;
}

// Function to display error messages
function showError(message) {
    alert("Error: " + message);
}

// Function to update booking information in the HTML
function updateBookingInformation(bookingType, numRooms, roomType, stayDuration, totalBillAmount, wifi, poolView, gardenView, extraBedCharge) {
      // Include extra requirements if selected
      var bookingInfo = "\n\n" + numRooms + " " + roomType + " room(s) for " + stayDuration + " day(s)" + "\n\nExtra Requirements : ";

      // Include extra requirements if selected
      
      if (wifi) {
          bookingInfo += "\nWifi";
      } else {
          bookingInfo += "";
      }
  
      if (poolView) {
          bookingInfo += "\nPool View";
      } else {
          bookingInfo += "";
      }
  
      if (gardenView) {
          bookingInfo += "\nGarden View";
      } else {
          bookingInfo += "";
      }
      if (bookingInfo)
          
      if (extraBedCharge > 0) {
        bookingInfo += "\nExtra Bed (LKR " + extraBedCharge.toFixed(2) + ")";
      }
     
    
  
      document.getElementById("currentBooking").innerText = bookingInfo;
    document.getElementById("currentBookingCost").innerText = "LKR " + totalBillAmount.toFixed(2);



    // Update loyalty points
    updateLoyaltyPoints(numRooms);
}

// Function to calculate and update prices based on form choices
function updatePrices() {
    try {
        // Get values from the form
        var roomType = document.getElementById("roomType").value;
        var numRooms = parseInt(document.getElementById("numRooms").value);
        var stayDuration = parseInt(document.getElementById("stayDuration").value);
        var promoCode = document.getElementById("promoCode").value;

        // Room prices
        var roomPrices = {
            "single": 25000.00,
            "double": 35000.00,
            "triple": 40000.00
        };


        

        // Validate number of rooms and stay duration
        if (isNaN(numRooms) || isNaN(stayDuration) || numRooms <= 0 || stayDuration <= 0 ) {
            throw "Invalid number of rooms or stay duration";
        }

        // Calculate base room price
        var roomPrice = roomPrices[roomType];

        // Validate room price
        if (!roomPrice) {
            throw "Invalid room price";
        }

        // Calculate total room price
        var totalRoomPrice = roomPrice * numRooms * stayDuration;

        // Extra charges for kids above 5 years
        var extraMealCharge = document.getElementById("numChildren").value * 5000 * stayDuration;

        // Extra charges for WiFi, pool view, and garden view
        var wifiCharge = document.getElementById("wifi").checked;
        var poolViewCharge = document.getElementById("poolView").checked;
        var gardenViewCharge = document.getElementById("gardenView").checked;

        // Extra bed charge
         var extraBedCharge = document.getElementById("extraBed").checked ? 8000.00 * stayDuration : 0.00;
        
        // Total bill amount
        var totalBillAmount = totalRoomPrice + extraMealCharge + extraBedCharge;

        //Add prices for extra requirements if needed
        if (wifiCharge) {
            totalBillAmount += stayDuration * 0;
        }
        if (poolViewCharge) {
            totalBillAmount += stayDuration * 0;
        }

        if (gardenViewCharge) {
            totalBillAmount += stayDuration * 0;
        }

        
        // Apply promo code discount if applicable
        if (promoCode === "Promo123") {
            totalBillAmount *= 0.95; // 5% discount
        }
        
        
        // Update booking information in the HTML
        updateBookingInformation("Hotel Booking", numRooms, roomType, stayDuration, totalBillAmount, wifiCharge, gardenViewCharge, poolViewCharge, extraBedCharge);
    } catch (error) {
        showError(error);
    }
}

function handleInvalidPromoCode() {
    showError("Wrong promo code. Please enter a valid promo code.");
}



// Event listeners for form elements
document.getElementById("roomType").addEventListener("change", updatePrices);
document.getElementById("numRooms").addEventListener("input", updatePrices);
document.getElementById("stayDuration").addEventListener("input", updatePrices);
document.getElementById("promoCode").addEventListener("input", updatePrices);
document.getElementById("numChildren").addEventListener("input", updatePrices);
document.getElementById("wifi").addEventListener("input", updatePrices)
document.getElementById("poolView").addEventListener("input", updatePrices)
document.getElementById("gardenView").addEventListener("input", updatePrices)

// Function to reset form
function resetForm() {
    document.getElementById("bookingForm").reset();
}

// Function to calculate and update prices based on adventure choices
function updateAdventurePrices() {
    try {
        // Get values from the form
        var divingLocalAdults = parseInt(document.getElementById("divingLocalAdults").value);
        var divingLocalKids = parseInt(document.getElementById("divingLocalKids").value);
        var divingForeignAdults = parseInt(document.getElementById("divingForeignAdults").value);
        var divingForeignKids = parseInt(document.getElementById("divingForeignKids").value);
        var guideAdultsChecked = document.getElementById("guideAdults").checked;
        var guideKidsChecked = document.getElementById("guideKids").checked;
        var hours = parseFloat(document.getElementById("adventureHours").value)

        // Diving prices
        var divingPricesPerHour = {
            "localAdults": 5000.00,
            "localKids": 2000.00,
            "foreignAdults": 10000.00,
            "foreignKids": 5000.00
        };
        

            


        // Calculate diving costs
        var divingCost = (divingLocalAdults * divingPricesPerHour.localAdults +
            divingLocalKids * divingPricesPerHour.localKids +
            divingForeignAdults * divingPricesPerHour.foreignAdults +
            divingForeignKids * divingPricesPerHour.foreignKids) * hours;

        // Additional charges for guides
        if (guideAdultsChecked) {
            divingCost += 1000.00 * hours;
        }

        if (guideKidsChecked) {
            divingCost += 500.00 * hours;
        }



        // Update booking information in the HTML
        updateBookingInformation(divingLocalAdults, divingForeignAdults, divingLocalKids, divingForeignKids, divingCost,guideAdultsChecked,guideKidsChecked);
        
        var bookingInfo = "\n" +"For "+ hours + " " + "hour(s) ";

        if (divingLocalAdults>0) {
            bookingInfo += "Local Adult Booking : " + divingLocalAdults;
        } else {
            bookingInfo += "";
        }
    
        if (divingLocalKids>0) {
            bookingInfo += "\nLocal Kids Booking : " + divingLocalKids;
        } else {
            bookingInfo += "";
        }
    
        if (divingForeignAdults) {
            bookingInfo += "\nForeign Adult Booking : " + divingForeignAdults;
        } else {
            bookingInfo += "";
        }

        if (divingForeignKids){
            bookingInfo += "\nForeign Kids Booking : " + divingForeignKids;
        } else {
            bookingInfo += "";}

        if (guideAdultsChecked){
            bookingInfo +="\nAdults Guide Included"
        } else{
            bookingInfo +="";}
        
        if (guideKidsChecked){
            bookingInfo +="\nKids Guide Included"
        } else{
            bookingInfo +="";}
        

        

        document.getElementById("currentBooking").innerText = bookingInfo;
        document.getElementById("currentBookingCost").innerText = "LKR " + divingCost.toFixed(2);
        


    } catch (error) {
        showError(error);
    }
}

// Event listeners for adventure form elements
document.getElementById("divingLocalAdults").addEventListener("input", updateAdventurePrices);
document.getElementById("divingLocalKids").addEventListener("input", updateAdventurePrices);
document.getElementById("divingForeignAdults").addEventListener("input", updateAdventurePrices);
document.getElementById("divingForeignKids").addEventListener("input", updateAdventurePrices);
document.getElementById("guideAdults").addEventListener("change", updateAdventurePrices);
document.getElementById("guideKids").addEventListener("change", updateAdventurePrices);
document.getElementById("adventureHours").addEventListener("input", updateAdventurePrices);
// Function to add the current booking to favorites
function addToFavorites() {
    try {
        // Get the current booking information
        var currentBookingInfo = document.getElementById("currentBooking").innerText;
        var currentBookingCost = document.getElementById("currentBookingCost").innerText;

        // Store the current booking in local storage
        localStorage.setItem("favoriteBookingInfo", currentBookingInfo);
        localStorage.setItem("favoriteBookingCost", currentBookingCost);

        // Display confirmation to the user
        alert("Booking added to favorites!");
    } catch (error) {
        showError(error);
    }
}

// Function to add the current booking to favorites
function addToFavoritesAd() {
    try {
        // Get the current booking information
        var currentBookingInfo = document.getElementById("currentBooking").innerText;
        var currentBookingCost = document.getElementById("currentBookingCost").innerText;

      

        // Store the current booking in local storage based on the booking type
        localStorage.setItem( "AdventureInfo", currentBookingInfo);
        localStorage.setItem( "AventureCost", currentBookingCost);

        // Display confirmation to the user
        alert("Booking added to favorites!");
    } catch (error) {
        showError(error);
    }
}

// Function to check and display loyalty points
function checkLoyalty() {
    try {
        // Get the loyalty points from local storage
        var loyaltyPoints = localStorage.getItem("loyaltyPoints");

        // Display loyalty points to the user
        if (loyaltyPoints > 0) {
            document.getElementById("loyaltyPoints").value = loyaltyPoints;
            alert("Loyalty Points: " + loyaltyPoints);
        } else {
            alert("No loyalty points earned yet.");
        }
    } catch (error) {
        showError(error);
    }
}

// Function to handle the "Book Now" button click
function bookNow() {
    try {
        // Get the current booking information
        var currentBookingInfo = document.getElementById("currentBooking").innerText;
        var currentBookingCost = document.getElementById("currentBookingCost").innerText;

        

        // Update overall booking information only for Hotel Booking
        overallBookingCost += parseFloat(currentBookingCost.replace("LKR ", ""));
        var overallBookingInfo = document.getElementById("overallBooking");
        var overallBookingCostElement = document.getElementById("overallBookingCost");

        // Append the new booking to the existing overall booking information
        overallBookingInfo.innerText += "\n\nHotel Booking : " + currentBookingInfo;
        overallBookingCostElement.innerText = "LKR " + overallBookingCost.toFixed(2);

        // Reset current booking information
        document.getElementById("currentBooking").innerText = "";
        document.getElementById("currentBookingCost").innerText = "LKR 0.00";

        document.getElementById("bookingForm").reset();


        
    } catch (error) {
        showError(error);
    }
}

// Function to handle the "Book Adventure" button click
function bookAdventure() {
    try {
        // Get the current booking information
        var currentBookingInfo = document.getElementById("currentBooking").innerText;
        var currentBookingCost = document.getElementById("currentBookingCost").innerText;

        // Update overall booking information
        overallBookingCost += parseFloat(currentBookingCost.replace("LKR ", ""));
        var overallBookingInfo = document.getElementById("overallBooking2");
        var overallBookingCostElement = document.getElementById("overallBookingCost");

        // Append the new booking to the existing overall booking information
        overallBookingInfo.innerText += "\n\nAdventure Booking : " + currentBookingInfo;
        overallBookingCostElement.innerText = "LKR " + overallBookingCost.toFixed(2);

        // Reset current booking information
        document.getElementById("currentBooking").innerText = "";
        document.getElementById("currentBookingCost").innerText = "LKR 0.00";

        document.getElementById("bookingForm").reset();

        // Update loyalty points
        updateLoyaltyPoints(0); // Pass 0 as the number of rooms for the reset

        // Display confirmation to the user
        // Display confirmation to the user
        alert("Thanks for booking in GreenPulse Hotel" + "Adventure Booking" + currentBookingInfo);
    } catch (error) {
        showError(error);
    }
}
