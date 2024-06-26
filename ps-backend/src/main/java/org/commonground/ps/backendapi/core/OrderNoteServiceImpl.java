package org.commonground.ps.backendapi.core;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.commonground.ps.backendapi.exception.BadRequestException;
import org.commonground.ps.backendapi.jpa.entities.OrderEntity;
import org.commonground.ps.backendapi.jpa.entities.OrderNoteEntity;
import org.commonground.ps.backendapi.jpa.entities.UserEntity;

import org.commonground.ps.backendapi.jpa.repositories.OrderNoteRepository;
import org.commonground.ps.backendapi.jpa.repositories.OrderRepository;
import org.commonground.ps.backendapi.jpa.repositories.UserRepository;
import org.commonground.ps.backendapi.model.Order;
import org.commonground.ps.backendapi.model.OrderNote;
import org.commonground.ps.backendapi.model.User;
import org.springframework.stereotype.Service;

@Service
public class OrderNoteServiceImpl implements OrderNoteService {

	private final UserRepository userRepository;
	private final OrderRepository orderRepository;
	private final OrderNoteRepository orderNoteRepository;

	public OrderNoteServiceImpl(
			OrderNoteRepository orderNoteRepository,
			OrderRepository orderRepository,
			UserRepository userRepository) {
		this.userRepository = userRepository;
		this.orderRepository = orderRepository;
		this.orderNoteRepository = orderNoteRepository;

	}

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
	public void addNew(OrderEntity orderEntity, Order order, User user, boolean definite) {
		Optional<UserEntity> userEntityOptional = userRepository.getUserById(user.getDomain().getId(), user.getId());
		if (userEntityOptional.isEmpty()) {
			throw new BadRequestException();
		}

		List<OrderNote> orderNotes = order.getNotes().stream().filter(note -> note.getId() == null || !note.getDefinite()).collect(Collectors.toList());
		for (OrderNote orderNote : orderNotes) {
			
			if (orderNote.getId() != null) {
				Optional<OrderNoteEntity> orderNoteEntityOptional = orderEntity.getOrderNote().stream().filter(noteEntity -> noteEntity.getId().equals(orderNote.getId())).findFirst();
				if (orderNoteEntityOptional.isPresent()) {
					OrderNoteEntity orderNoteEntity = orderNoteEntityOptional.get();
					orderNoteEntity.setContent(orderNote.getContent());
					orderNoteEntity.setUser(userEntityOptional.get());
					orderNoteEntity.setDefinite(definite);
				}
			} else {
				OrderNoteEntity orderNoteEntity = createOrderNoteEntity(orderNote.getContent(), userEntityOptional.get());
				orderNoteEntity.setDefinite(definite);
				orderNoteEntity.setOrder(orderEntity);
				orderEntity.getOrderNote().add(orderNoteEntity);
			}
		}
	}

	@Override
	public Optional<List<OrderNoteEntity>> saveNew(OrderEntity orderEntity, Order order, User user, boolean definite) throws BadRequestException {

		if (user == null) {
			throw new BadRequestException();
		}
		
		if (order.getNotes() == null || order.getNotes().isEmpty()) {
			return Optional.empty();
		}

		// Select all new notes and alle indefinite notes
		List<OrderNote> orderNotes = order.getNotes().stream().filter(note -> note.getId() == null || !note.getDefinite()).collect(Collectors.toList());
		if (orderNotes.isEmpty()) {
			return Optional.empty();
		}

		addNew(orderEntity, order, user, definite);
		
		orderEntity = orderRepository.saveAndFlush(orderEntity);

		return Optional.of(orderEntity.getOrderNote());
	}
}
