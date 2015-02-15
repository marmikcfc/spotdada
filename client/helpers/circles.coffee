Template.myCircles.rendered = () ->
  #$('.friendItem').draggable({
  #snap: true,
  #  revert: true,
  #  start: () ->
  #    $(".dropArea").addClass 'show'
   # stop: () ->
   #   $(".dropArea").removeClass 'show'
  #})

  #$('.dropItem').droppable({
  #  hoverClass: "highlight",
  #  accept: ".friendItem",
   # drop: (event, ui) ->
    #  $(this).addClass 'drop-feedback'
  #})

  #target elements with the "draggable" class
  interact('.friendItem').draggable({
    #allow dragging of multple elements at the same time
    max: Infinity,

    #call this function on every dragmove event
    onmove: (event) ->
      target = event.target

      #translate the element

      #update the posiion attributes
      #target.setAttribute('data-x', x);
      #target.setAttribute('data-y', y);
    ,
    #call this function on every dragend event
    onend: (event) ->
      textEl = event.target.querySelector('p')
      textEl && (textEl.textContent =
      'moved a distance of ' + (Math.sqrt(event.dx * event.dx + event.dy * event.dy)|0) + 'px')

  })
  #enable inertial throwing
  .inertia(true)
  #keep the element within the area of it's parent
  .restrict({
    drag: "parent",
    endOnly: true,
    elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
  })

  #allow more than one interaction at a time
  interact.maxInteractions(Infinity);