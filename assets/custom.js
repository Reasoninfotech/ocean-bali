// // Select the elements using querySelector and querySelectorAll
// var sizeElement = document.querySelector("body.product p.swatches__option-name.h5.Size");
// var sizeGuideTrigger = document.querySelector("body.product span.popup_content_link.size-guide-trigger.first-trigger");

// // Append the sizeGuideTrigger to the sizeElement
// if (sizeElement && sizeGuideTrigger) {
//   sizeElement.appendChild(sizeGuideTrigger);
// }


(function($){
  $(function(){
  });

  $( window ).on( "load", function() {

    if($('div.estimated_deliveryx').length > 0){
      var date_today = new Date(); //.getDay();
      var day_today_au = date_today.toLocaleString('en-AU', {timeZone: 'Australia/Sydney', weekday: 'short'});
      var hr_today_au = date_today.toLocaleString('en-AU', {timeZone: 'Australia/Sydney',hourCycle: 'h24', hour: '2-digit'});
  
      if( $.inArray(day_today_au, ['Fri','Sat','Sun']) !== -1 ){
        if( day_today_au == 'Fri' && hr_today_au < 15 ){
          $('div.estimated_delivery div.display').html('Ships in 24 hours');
          console.log('Ships in 24 hours');
        }
        else{
          $('div.estimated_delivery div.display').html('Ships next business day');
          console.log('Ships next business day');
        }
      }
      else{
        // Ships in 24 hours.
        $('div.estimated_delivery div.display').html('Ships in 24 hours');
        console.log('Ships in 24 hours.');
      }

      $('div.estimated_delivery').show();
    }

    // Move Afterpay notif below the estimated delivery - Product Page
    $("body.product .estimated_delivery").after($("body.product .product__section--header square-placement"));
      // $("body.product p.swatches__option-name.h5.Size").append($("body.product span.popup_content_link.size-guide-trigger.first-trigger")); 
  });
  
})(jQuery);
// document.addEventListener("DOMContentLoaded", (event) => {
//   document.querySelectorAll("body.product p.swatches__option-name.h5.Size").forEach(function(element) {
//       var sizeGuideTrigger = document.querySelector("body.product span.popup_content_link.size-guide-trigger.first-trigger");
//       if (sizeGuideTrigger) {
//           element.append(sizeGuideTrigger);
//           sizeGuideTrigger.style.display = "flex"
//       }
//   });
// });

document.addEventListener("DOMContentLoaded", (event) => {
  // ✅ Step 1: Append the trigger dynamically
  document.querySelectorAll("body.product p.swatches__option-name.h5.Size").forEach(function(element) {
    const sizeGuideTrigger = document.querySelector("body.product span.popup_content_link.size-guide-trigger.first-trigger");
    if (sizeGuideTrigger) {
      element.append(sizeGuideTrigger);
      sizeGuideTrigger.style.display = "flex";
    }
  });

  // ✅ Step 2: Attach delegated click events (for dynamically added elements)
  $(document).on('click', '.first-trigger .product__contact-trigger, .first-trigger .size-guide-trigger', function() {
    $('#modal-popup-content').addClass('modal--active');
    $('body').addClass('modal--open modal-popup-content--open');
  });

  // ✅ Step 3: Handle closing modal
  $(document).on('click', '.slideout__trigger-popup-content, .js-modal-overlay', function() {
    $('#modal-popup-content').removeClass('modal--active');
    $('body').addClass('modal--closed').removeClass('modal--open modal-popup-content--open');
  });

});



document.addEventListener("DOMContentLoaded", (event) => {
  if($('.ajax-cart__final-details').length){
  setInterval(function () {
   const elements = document.querySelectorAll('.ajax-cart__final-details');
    elements.forEach(function (element) {
        const totalText = element.querySelector('.subtotal-price .cart-original-total').textContent;
        const totalNumber = totalText.replace(/[^\d]/g, '');
        let currencySymbol = totalText.replace(/[0-9.,\s]/g, '');
    
        const afterPayElements = document.querySelectorAll('.ajax-cart__cart-form .after_pay_row_inner strong');
        afterPayElements.forEach(function (afterPayElement) {
            afterPayElement.innerHTML = `${currencySymbol.replace(/(IDR|Bds|EUR|ALL|DZD|AUD|XCD|BSD|BZD|USD|BOB|KYD|CRC|DKK|FJD|XPF|GBP|HKD|HUF|INR|IDR|ILS|JPY|MYR|MVR|MUR|PHP|PLN|QAR|SAR|XOF|SBD|LKR|SEK|CHF|TWD|THB|UAE)/g, '')} ${(totalNumber / 4 / 100).toFixed(2)}`;
        });
    });

  }, 1000);
  }
})

document.addEventListener("DOMContentLoaded", (event) => {
  if($('.product__section-details .price__pricing-group .price-item--regular').length){
   setInterval(function () {
     const proafterPay = document.querySelector('.product__section-details .price__pricing-group .price-item--regular').textContent;
     const PrototalNumber = proafterPay.replace(/[^\d]/g, '');
      let ProcurrencySymbol = proafterPay.replace(/[0-9.,\s]/g, '');
      document.querySelector('.product__section-details .after_pay_row_inner strong').innerHTML = `${ProcurrencySymbol.replace(/(IDR|Bds|EUR|ALL|DZD|AUD|XCD|BSD|BZD|USD|BOB|KYD|CRC|DKK|FJD|XPF|GBP|HKD|HUF|INR|IDR|ILS|JPY|MYR|MVR|MUR|PHP|PLN|QAR|SAR|XOF|SBD|LKR|SEK|CHF|TWD|THB|UAE)/g, '')} ${(PrototalNumber / 4 / 100).toFixed(2)}`;
      console.log('==========> ', `${ProcurrencySymbol} ${(PrototalNumber / 4 / 100).toFixed(2)}`)
    }, 1000);
  }
})


// document.addEventListener('DOMContentLoaded', function () {

//   // Check and reattach dynamic quick view handlers periodically
//   setInterval(function () {
//     const afterPayBtn = document.querySelector(".after_pay_btn button");
//     const afterPayImg = document.querySelector(".after_pay_img");
//     const afterPayCloseIcon = document.querySelector(".after_pay_close_icon");

//     // ✅ AFTERPAY Button Logic
//     if (afterPayBtn && afterPayImg) {
//       afterPayBtn.addEventListener("click", function() {
//         afterPayImg.style.display = "flex";
//       }, { once: true });
//     }

//     if (afterPayCloseIcon && afterPayImg) {
//       afterPayCloseIcon.addEventListener("click", function() {
//         afterPayImg.style.display = "none";
//       }, { once: true });
//     }

//     // ✅ Handle Swatch Click (color & size)
//     function handleSwatchClick(event) {
//       const clickedInput = event.target;
//       if (clickedInput.tagName === 'INPUT' && clickedInput.hasAttribute('data-inventort')) {
//         const inventory = parseInt(clickedInput.getAttribute('data-inventort'), 10);
//         const itemsLeftText = document.querySelector('.quick_view_box .items_left_text');
//         const itemsLeftTextParnt = document.querySelector('.modal__container.modal--active .quick_view_box');

//         // ✅ Check for null before using
//         if (!itemsLeftTextParnt || !itemsLeftText) return;

//         let displayText = '';

//         if (inventory === 0) {
//           displayText = 'Sold Out';
//           itemsLeftTextParnt.classList.remove('lowe_value');
//           itemsLeftTextParnt.style.display = 'none';
//         } else if (inventory >= 1 && inventory <= 4) {
//           displayText = `${inventory} item${inventory === 1 ? '' : 's'} left`;
//           itemsLeftTextParnt.classList.add('lowe_value');
//           itemsLeftTextParnt.style.display = 'flex';
//         } else if (inventory >= 5) {
//           displayText = 'In Stock';
//           itemsLeftTextParnt.classList.remove('lowe_value');
//           itemsLeftTextParnt.style.display = 'flex';
//         }

//         itemsLeftText.textContent = displayText;
//       }
//     }

//     // ✅ Re-check selection on load
//     function checkInitialSelection() {
//       const selectedColorInput = document.querySelector('.swatches__swatch--color input[type="radio"]:checked');
//       const selectedSizeInput = document.querySelector('.swatches__swatch--regular input[type="radio"]:checked');

//       if (selectedColorInput) handleSwatchClick({ target: selectedColorInput });
//       if (selectedSizeInput) handleSwatchClick({ target: selectedSizeInput });
//     }

//     // ✅ Add listeners if elements exist
//     const colorInputs = document.querySelectorAll('.swatches__swatch--color input[type="radio"]');
//     const sizeInputs = document.querySelectorAll('.swatches__swatch--regular input[type="radio"]');

//     colorInputs.forEach(input => {
//       input.addEventListener('click', handleSwatchClick);
//     });

//     sizeInputs.forEach(input => {
//       input.addEventListener('click', handleSwatchClick);
//     });

//     checkInitialSelection();

//   }, 1000);

// });


document.addEventListener("DOMContentLoaded", function() {
  function initAfterPayHandlers() {
    const afterPayBtn = document.querySelector(".after_pay_btn button");
    const afterPayImg = document.querySelector(".after_pay_img");
    const afterPayCloseIcon = document.querySelector(".after_pay_close_icon");

    if (afterPayBtn && afterPayImg) {
      afterPayBtn.addEventListener("click", () => {
        afterPayImg.style.display = "flex";
      });
    }

    if (afterPayCloseIcon && afterPayImg) {
      afterPayCloseIcon.addEventListener("click", () => {
        afterPayImg.style.display = "none";
      });
    }
  }

  function handleSwatchClick(event) {
  const clickedInput = event.target;
  if (clickedInput.tagName !== 'INPUT' || !clickedInput.hasAttribute('data-inventort')) return;

  const inventory = parseInt(clickedInput.getAttribute('data-inventort'), 10);
  const itemsLeftText =
    document.querySelector('.quick_view_box .items_left_text') ||
    document.querySelector('.product__info-wrapper .items_left_text') ||
    document.querySelector('.items_left_text'); // fallback

  const itemsLeftTextParnt =
    document.querySelector('.modal__container.modal--active .quick_view_box') ||
    document.querySelector('.product__info-wrapper') ||
    document.querySelector('.product-single__info');

  if (!itemsLeftText || !itemsLeftTextParnt) return; // full safety

  let displayText = '';

  if (inventory === 0) {
    displayText = 'Sold Out';
    itemsLeftTextParnt.classList.remove('lowe_value');
    itemsLeftTextParnt.style.display = 'none';
  } else if (inventory >= 1 && inventory <= 4) {
    displayText = `${inventory} item${inventory === 1 ? '' : 's'} left`;
    itemsLeftTextParnt.classList.add('lowe_value');
    itemsLeftTextParnt.style.display = 'flex';
  } else {
    displayText = 'In Stock';
    itemsLeftTextParnt.classList.remove('lowe_value');
    itemsLeftTextParnt.style.display = 'flex';
  }

  itemsLeftText.textContent = displayText;
}



  function initSwatchHandlers() {
    const swatches = document.querySelectorAll('.swatches__swatch input[type="radio"]');
    swatches.forEach(input => {
      input.removeEventListener('click', handleSwatchClick); // Prevent duplicates
      input.addEventListener('click', handleSwatchClick);
    });

    // Run initial check for pre-selected inputs
    const checked = document.querySelectorAll('.swatches__swatch input[type="radio"]:checked');
    checked.forEach(input => handleSwatchClick({ target: input }));
  }

  // ✅ Run once immediately
  initAfterPayHandlers();
  initSwatchHandlers();

  // ✅ Observe DOM changes for Quick View re-renders (Shopify AJAX)
  const observer = new MutationObserver(() => {
    initAfterPayHandlers();
    initSwatchHandlers();
  });

  observer.observe(document.body, { childList: true, subtree: true });
});



(function () {
    function addDutyCheckbox() {
      var countryInput = document.querySelector('input[name="country_code"]');
      if (countryInput && countryInput.value !== "AU") {
        var buttonsContainers = document.querySelectorAll('.ajax-cart__buttons');
        if (!buttonsContainers.length) return;

        buttonsContainers.forEach(function (buttonsContainer, index) {
            if (buttonsContainer.querySelector('.duty-tax-checkbox')) return;

            var wrapper = document.createElement('div');
            wrapper.classList.add('duty-tax-div');

            var checkboxId = 'duty-tax-checkbox-' + index;
            var checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.id = checkboxId;
            checkbox.classList.add('duty-tax-checkbox');
            checkbox.checked = true;
            var label = document.createElement('label');
            label.setAttribute('for', checkboxId);
            label.classList.add('duty-tax-label');
            label.textContent = 'I understand import duties, taxes, and fees may be charged by my country on delivery and are not included at checkout.';
            wrapper.appendChild(checkbox);
            wrapper.appendChild(label);
            buttonsContainer.prepend(wrapper);
            var submitBtn = buttonsContainer.querySelector('.ajax-cart__button-submit');
            if (submitBtn) {
                submitBtn.disabled = !checkbox.checked;
                checkbox.addEventListener('change', function () {
                    submitBtn.disabled = !this.checked;
                });
            }
        });
      }
    }

    setInterval(addDutyCheckbox, 500);
})();