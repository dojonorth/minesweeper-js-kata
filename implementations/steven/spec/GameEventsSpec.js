describe('The MineSweeper game event manager', function () {

	it('allows a callback to be registered against an event type', function () {
		pending();
	});

	it('provides the ability to clear all registered event listeners', function () {
		pending();
	});

	it('executes callbacks associated with an event type when the event is triggered', function () {
		pending();
	});

	it('sends the event object as the first param of the callback', function () {
		pending();
	});

	it('throws an error when calling triggerEvent with an invalid event object', function () {
		expect(function () {
			GameEventManager.triggerEvent('not an event object');
		}).toThrow();
	});

});