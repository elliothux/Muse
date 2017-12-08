
const EventType = [
    // Clipboard Events
    'onCopy', 'onCut', 'onPaste',
    // Composition Events
    'onCompositionEnd', 'onCompositionStart', 'onCompositionUpdate',
    // Keyboard Events
    'onKeyDown', 'onKeyPress', 'onKeyUp',
    // Focus Events
    'onFocus', 'onBlur',
    // Form Events
    'onChange', 'onInput', 'onInvalid', 'onSubmit',
    // Mouse Events
    'onClick', 'onContextMenu', 'onDoubleClick',
    'onDrag', 'onDragEnd', 'onDragEnter', 'onDragExit',
    'onDragLeave', 'onDragOver', 'onDragStart',
    'onDrop', 'onMouseDown', 'onMouseEnter',
    'onMouseLeave', 'onMouseMove', 'onMouseOut',
    'onMouseOver' ,'onMouseUp',
    // Selection Events
    'onSelect',
    // Touch Events
    'onTouchCancel', 'onTouchEnd', 'onTouchMove', 'onTouchStart',
    // UI Events
    'onScroll',
    // Wheel Events
    'onWheel',
    // Media Events
    'onAbort', 'onCanPlay', 'onCanPlayThrough',
    'onDurationChange', 'onEmptied', 'onEncryptedonEnded',
    'onError', 'onLoadedData', 'onLoadedMetadata',
    'onLoadStart', 'onPause', 'onPlayonPlaying',
    'onProgress', 'onRateChange', 'onSeeked',
    'onSeeking', 'onStalled', 'onSuspendonTimeUpdate',
    'onVolumeChange', 'onWaiting',
    // Image Events
    'onLoad', 'onError',
    // Animation Events
    'onAnimationStart', 'onAnimationEnd', 'onAnimationIteration',
    // Transition Events
    'onTransitionEnd',
    // Other Events
    'onToggle'
];


const EventMap = EventType.reduce((eventsMap, event) => {
    eventsMap[event] = event
        .replace('on', '')
        .replace(/[A-Z]/g, e => e.toLowerCase());
    return eventsMap;
}, {});


export {
    EventType,
    EventMap
}
