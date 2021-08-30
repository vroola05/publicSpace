package org.commonground.ps.backendapi.model;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class Message {
	int status;
	String message;

	public Message(int status, String message) {
		this.setStatus(status);
		this.setMessage(message);
	}
}
