package com.talk.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collector;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.talk.beans.Question;
import com.talk.beans.Talk;
import com.talk.repo.TalkRepo;

@Service
public class TalkService {
	
	@Autowired
	TalkRepo db;

	public List<Talk> getAll() {
		return db.findAll();
	}

	public Talk getTalk(String id) {
		Optional<Talk> t = db.findById(id);
		if (t.isPresent()) {
			return t.get();
		}
		return null;
	}

	public Talk saveTalk(Talk t) {
		if (t.getQuestions() == null) {
			t.setQuestions(new ArrayList<Question>());
		}
		t = db.save(t);
		return t;
	}

	public Boolean newQuestion(String talkId, Question q) {
		Talk t = this.getTalk(talkId);
		t.getQuestions().add(q);
		db.save(t);
		return true;
	}

	public Boolean upVote(String talkId, Question q) {
		Talk t = this.getTalk(talkId);
		t.getQuestions().stream().forEach(q1 -> {
			if (q1.getQuestion().equals(q.getQuestion())) {
				q1.setUpvotes(q.getUpvotes());
			}
		});
		db.save(t);
		
		return true;
	}

	public Boolean deleteQuestion(String id, String s) {
		Talk t = this.getTalk(id);
		t.setQuestions(t.getQuestions().stream().filter(q->q.getQuestion().equals(s)).collect(Collectors.toList()));
		// TODO Auto-generated method stub
		return null;
	}

}
