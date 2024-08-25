export const googleOneTap = (
	{
		client_id,
		auto_select = false,
		cancel_on_tap_outside = false,
		context = 'signin',
		...otherOptions
	},
	callback
) => {
	if (!client_id) {
		throw new Error('client_id is required')
	} else {
    try {
      const contextValue = ['signin', 'signup', 'use']
      window.google.accounts.id.initialize({
        client_id: client_id,
        callback: callback,
        auto_select: auto_select,
        cancel_on_tap_outside: cancel_on_tap_outside,
        context: contextValue,
        ...otherOptions
      })
      google.accounts.id.renderButton(
        document.getElementById("googleSignIn"),
        { theme: "outline", size: "large" }  // customization attributes
      )
      window.google.accounts.id.prompt()
    } catch (error) {
      console.error("error creating googleOneTap", error)
    }
  }
}
