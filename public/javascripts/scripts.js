let giftsForm = document.getElementById('gifts-form')
let numGifts = 0

addGift()

if(giftsForm) document.getElementById('add-gift').addEventListener('click', addGift)

function addGift(){
  numGifts++
  let newGiftElem = document.createElement('div')

  newGiftElem.innerHTML = `
    <div class="gift">
      <label class="input-sizer">
        <span>Add a gift &rarr;</span>
        <input type="text" name="gifts[${numGifts}][name]" id="gift${numGifts}name" placeholder="Something..." onInput="this.parentNode.dataset.value = this.value" size="11">
      </label>
      -
      <label for="gift${numGifts}note" class="input-sizer">
        <span class="screen-reader-text">Note</span>
        <input type="text" name="gifts[${numGifts}][note]" id="gift${numGifts}note" placeholder="Details..." onInput="this.parentNode.dataset.value = this.value" size="9">
      </label>
      -
      <label for="gift${numGifts}link" class="input-sizer">
        <span class="screen-reader-text">Link</span>
        <input type="url" name="gifts[${numGifts}][link]" id="gift${numGifts}link" placeholder="Link" onInput="this.parentNode.dataset.value = this.value" size="4"> 
      </label>
    </div> `

  giftsForm.appendChild(newGiftElem)
}