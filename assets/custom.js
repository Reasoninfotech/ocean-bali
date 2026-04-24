(function($) {
  function initEstimatedDelivery() {
    if ($('div.estimated_deliveryx').length > 0) {
      var date_today = new Date();
      var options = { timeZone: 'Australia/Sydney', weekday: 'short', hour: '2-digit', hourCycle: 'h24' };
      var au_time = new Intl.DateTimeFormat('en-AU', options).formatToParts(date_today);
      var day_today_au = au_time.find(p => p.type === 'weekday').value;
      var hr_today_au = parseInt(au_time.find(p => p.type === 'hour').value, 10);

      if (['Fri', 'Sat', 'Sun'].includes(day_today_au)) {
        if (day_today_au === 'Fri' && hr_today_au < 15) {
          $('div.estimated_delivery div.display').html('Ships in 24 hours');
        } else {
          $('div.estimated_delivery div.display').html('Ships next business day');
        }
      } else {
        $('div.estimated_delivery div.display').html('Ships in 24 hours');
      }
      $('div.estimated_delivery').show();
      $("body.product .estimated_delivery").after($("body.product .product__section--header square-placement"));
    }
  }

  function updateAfterPay(selector, targetSelector) {
    const element = document.querySelector(selector);
    if (!element) return;
    
    const totalText = element.textContent;
    const totalNumber = totalText.replace(/[^\d]/g, '');
    const currencySymbol = totalText.replace(/[0-9.,\s]/g, '').replace(/(IDR|Bds|EUR|ALL|DZD|AUD|XCD|BSD|BZD|USD|BOB|KYD|CRC|DKK|FJD|XPF|GBP|HKD|HUF|INR|IDR|ILS|JPY|MYR|MVR|MUR|PHP|PLN|QAR|SAR|XOF|SBD|LKR|SEK|CHF|TWD|THB|UAE)/g, '');
    
    const afterPayElements = document.querySelectorAll(targetSelector);
    afterPayElements.forEach(el => {
      el.innerHTML = `${currencySymbol} ${(totalNumber / 4 / 100).toFixed(2)}`;
    });
  }

  function addDutyCheckbox() {
    const countryInput = document.querySelector('input[name="country_code"]');
    if (countryInput && countryInput.value !== "AU") {
      const buttonsContainers = document.querySelectorAll('.ajax-cart__buttons');
      buttonsContainers.forEach((buttonsContainer, index) => {
        if (buttonsContainer.querySelector('.duty-tax-checkbox')) return;
        const wrapper = document.createElement('div');
        wrapper.className = 'duty-tax-div';
        const checkboxId = `duty-tax-checkbox-${index}`;
        wrapper.innerHTML = `<input type="checkbox" id="${checkboxId}" class="duty-tax-checkbox" checked>
                             <label for="${checkboxId}" class="duty-tax-label">I understand import duties, taxes, and fees may be charged by my country on delivery and are not included at checkout.</label>`;
        buttonsContainer.prepend(wrapper);
        const checkbox = wrapper.querySelector('input');
        const submitBtn = buttonsContainer.querySelector('.ajax-cart__button-submit');
        if (submitBtn) {
          submitBtn.disabled = !checkbox.checked;
          checkbox.addEventListener('change', function() { submitBtn.disabled = !this.checked; });
        }
      });
    }
  }

  function initSwatchHandlers() {
    const swatches = document.querySelectorAll('.swatches__swatch input[type="radio"]');
    swatches.forEach(input => {
      input.addEventListener('click', function(e) {
        const inventory = parseInt(this.getAttribute('data-inventort'), 10);
        const selectors = ['.quick_view_box .items_left_text', '.product__info-wrapper .items_left_text', '.items_left_text'];
        const textElement = selectors.map(s => document.querySelector(s)).find(el => el);
        const parentSelectors = ['.modal__container.modal--active .quick_view_box', '.product__info-wrapper', '.product-single__info'];
        const parentElement = parentSelectors.map(s => document.querySelector(s)).find(el => el);
        
        if (!textElement || !parentElement) return;
        
        if (inventory === 0) {
          textElement.textContent = 'Sold Out';
          parentElement.classList.remove('lowe_value');
          parentElement.style.display = 'none';
        } else if (inventory >= 1 && inventory <= 4) {
          textElement.textContent = `${inventory} item${inventory === 1 ? '' : 's'} left`;
          parentElement.classList.add('lowe_value');
          parentElement.style.display = 'flex';
        } else {
          textElement.textContent = 'In Stock';
          parentElement.classList.remove('lowe_value');
          parentElement.style.display = 'flex';
        }
      });
    });
  }

  $(function() {
    initEstimatedDelivery();
    initSwatchHandlers();
    
    $(document).on('click', '.first-trigger .product__contact-trigger, .first-trigger .size-guide-trigger', function() {
      $('#modal-popup-content').addClass('modal--active');
      $('body').addClass('modal--open modal-popup-content--open');
    });
    
    $(document).on('click', '.slideout__trigger-popup-content, .js-modal-overlay', function() {
      $('#modal-popup-content').removeClass('modal--active');
      $('body').addClass('modal--closed').removeClass('modal--open modal-popup-content--open');
    });

    const observer = new MutationObserver(() => {
      updateAfterPay('.ajax-cart__final-details .subtotal-price .cart-original-total', '.ajax-cart__cart-form .after_pay_row_inner strong');
      updateAfterPay('.product__section-details .price__pricing-group .price-item--regular', '.product__section-details .after_pay_row_inner strong');
      addDutyCheckbox();
    });
    observer.observe(document.body, { childList: true, subtree: true });

    // Size guide trigger
    document.querySelectorAll("body.product p.swatches__option-name.h5.Size").forEach(el => {
      const trigger = document.querySelector("body.product span.popup_content_link.size-guide-trigger.first-trigger");
      if (trigger) { el.append(trigger); trigger.style.display = "flex"; }
    });
  });
})(jQuery);