package org.commonground.ps.backendapi.core;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.commonground.ps.backendapi.exception.BadRequestException;
import org.commonground.ps.backendapi.jpa.entities.NoteEntity;
import org.commonground.ps.backendapi.jpa.entities.OrderEntity;
import org.commonground.ps.backendapi.jpa.entities.OrderNoteEntity;
import org.commonground.ps.backendapi.jpa.entities.UserEntity;

import org.commonground.ps.backendapi.jpa.repositories.OrderNoteRepository;
import org.commonground.ps.backendapi.jpa.repositories.UserRepository;
import org.commonground.ps.backendapi.model.Order;
import org.commonground.ps.backendapi.model.OrderNote;
import org.commonground.ps.backendapi.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class OrderNoteServiceImpl implements OrderNoteService {

	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private OrderNoteRepository orderNoteRepository;

	@Override
	public OrderNoteEntity createOrderNoteEntity(String content, UserEntity userEntity) {
		OrderNoteEntity orderNoteEntity = new OrderNoteEntity();
		orderNoteEntity.setContent(content);
		orderNoteEntity.setUser(userEntity);
		orderNoteEntity.setDateCreated(new Date());
		return orderNoteEntity;
	}

	@Override
	public Optional<OrderNoteEntity> save(OrderEntity orderEntity, String content, User user, boolean definite) {
		if (user == null) {
			return Optional.empty();
		}
		Optional<UserEntity> userEntityOptional = userRepository.getUserById(user.getDomain().getId(), user.getId());
		if (userEntityOptional.isEmpty()) {
			return Optional.empty();
		}

		OrderNoteEntity orderNoteEntity = createOrderNoteEntity(content, userEntityOptional.get());
		
		orderNoteEntity.setOrder(orderEntity);

		return Optional.of(orderNoteRepository.save(orderNoteEntity));
	}

	@Override
	public Optional<List<OrderNoteEntity>> saveNew(OrderEntity orderEntity, Order order, User user, boolean definite) throws BadRequestException {
		if (user == null) {
			throw new BadRequestException();
		}
		Optional<UserEntity> userEntityOptional = userRepository.getUserById(user.getDomain().getId(), user.getId());
		if (userEntityOptional.isEmpty()) {
			throw new BadRequestException();
		}

		if (order.getNotes() == null || order.getNotes().isEmpty()) {
			return Optional.empty();
		}

		List<OrderNote> orderNotes = order.getNotes().stream().filter(note -> note.getId() == null || definite && !note.getDefinite()).collect(Collectors.toList());;
		if (orderNotes.isEmpty()) {
			return Optional.empty();
		}

		List<OrderNoteEntity> orderNoteEntities = new ArrayList<>();
		for (OrderNote orderNote : orderNotes) {
			OrderNoteEntity orderNoteEntity = null;
			if (order.getId() != null) {
				Optional<OrderNoteEntity> orderNoteEntityOptional = orderEntity.getOrderNote().stream().filter(noteEntity -> noteEntity.getId() == order.getId()).findFirst();
				if (orderNoteEntityOptional.isEmpty()) {
					return Optional.empty();
				}
				orderNoteEntity = orderNoteEntityOptional.get();
				orderNoteEntity.setContent(orderNote.getContent());
				orderNoteEntity.setUser(userEntityOptional.get());
			} else {
				orderNoteEntity = createOrderNoteEntity(orderNote.getContent(), userEntityOptional.get());
				orderNoteEntity.setDefinite(definite);
				orderNoteEntity.setOrder(orderEntity);
			}
			orderNoteEntities.add(orderNoteEntity);
		}
		// @TODO Save all exisiting notes
		return Optional.of(orderNoteRepository.saveAll(orderNoteEntities));
	}
}
