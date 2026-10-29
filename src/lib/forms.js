import pb from '@/lib/pocketbase';

async function create(collection, data) {
	try {
		return { success: true, record: await pb.collection(collection).create(data, { $autoCancel: false }) };
	} catch (error) {
		console.error(`Error creating ${collection} record:`, error);
		return { success: false, error: error.message };
	}
}

export default {
	submitClassRegistration: (data) => create('class_registrations', data),
	submitEventRegistration: (data) => create('event_registrations', data),
	submitContactInquiry: (data) => create('contact_inquiries', data),
};
