package com.talk.repo;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.talk.beans.Talk;

@Repository
public interface TalkRepo extends MongoRepository<Talk, String> {

}
