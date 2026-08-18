function createTranslate(locale){
	try{
	const path=`../i18n/{locale}.json`;
        const reponse=await fetch(path);
	    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
	}
	catch (e){
		throw error;
		console.error("maybe the locale is not supported")
	}
return {
	data:response,
	t(key){
		return data[key];
	}
}
}
