package com.talk.beans;

import java.util.List;

public class Question {
	private String question;
	private List<String> upvotes;
	
	public String getQuestion() {
		return question;
	}
	public void setQuestion(String question) {
		this.question = question;
	}
	public List<String> getUpvotes() {
		return upvotes;
	}
	public void setUpvotes(List<String> upvotes) {
		this.upvotes = upvotes;
	}
	
	

}
